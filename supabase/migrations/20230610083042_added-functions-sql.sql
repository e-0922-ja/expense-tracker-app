alter table "public"."ExpenseStatus" drop constraint "expensestatus_updatedby_fkey";

alter table "public"."ExpenseStatus" drop constraint "expensestatus_userid_fkey";

alter table "public"."Expenses" drop constraint "expenses_categoryid_fkey";

alter table "public"."Expenses" drop constraint "expenses_groupid_fkey";

alter table "public"."Expenses" drop constraint "expenses_payer_fkey";

alter table "public"."Expenses" drop constraint "expenses_registeredby_fkey";

alter table "public"."Expenses" drop constraint "expenses_updatedby_fkey";

alter table "public"."GroupMembers" drop constraint "groupmembers_friendshipid_fkey";

alter table "public"."Groups" drop constraint "groups_registeredby_fkey";

alter table "public"."Groups" drop constraint "groups_updatedby_fkey";

alter table "public"."ExpenseStatus" drop constraint "expensestatus_pkey";

alter table "public"."GroupMembers" drop constraint "groupmembers_pkey";

drop index if exists "public"."expensestatus_pkey";

drop index if exists "public"."groupmembers_pkey";

alter table "public"."ExpenseStatus" drop column "id";

alter table "public"."ExpenseStatus" drop column "ratio";

alter table "public"."ExpenseStatus" add column "expenseId" uuid not null;

alter table "public"."ExpenseStatus" alter column "paid" set default false;

alter table "public"."ExpenseStatus" alter column "userId" set not null;

alter table "public"."Expenses" drop column "methodId";

alter table "public"."Expenses" add column "date" timestamp with time zone default now();

alter table "public"."Expenses" alter column "id" set default gen_random_uuid();

alter table "public"."Expenses" alter column "id" drop identity;

alter table "public"."Expenses" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Expenses" alter column "settled" set default false;

alter table "public"."GroupMembers" drop column "friendshipId";

alter table "public"."GroupMembers" add column "memberId" uuid not null;

alter table "public"."Groups" alter column "id" set default gen_random_uuid();

CREATE UNIQUE INDEX expensestatus_pkey ON public."ExpenseStatus" USING btree ("expenseId", "userId");

CREATE UNIQUE INDEX groupmembers_pkey ON public."GroupMembers" USING btree ("groupId", "memberId");

alter table "public"."ExpenseStatus" add constraint "expensestatus_pkey" PRIMARY KEY using index "expensestatus_pkey";

alter table "public"."GroupMembers" add constraint "groupmembers_pkey" PRIMARY KEY using index "groupmembers_pkey";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expenses"(id) ON DELETE CASCADE not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_expenseId_fkey";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Users"(id) ON DELETE SET NULL not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_updatedBy_fkey";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_userId_fkey";

alter table "public"."Expenses" add constraint "Expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_categoryId_fkey";

alter table "public"."Expenses" add constraint "Expenses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_groupId_fkey";

alter table "public"."Expenses" add constraint "Expenses_payer_fkey" FOREIGN KEY (payer) REFERENCES "Users"(id) not valid;

alter table "public"."Expenses" validate constraint "Expenses_payer_fkey";

alter table "public"."Expenses" add constraint "Expenses_registeredBy_fkey" FOREIGN KEY ("registeredBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_registeredBy_fkey";

alter table "public"."Expenses" add constraint "Expenses_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_updatedBy_fkey";

alter table "public"."GroupMembers" add constraint "groupmembers_memberid_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"(id) ON DELETE RESTRICT not valid;

alter table "public"."GroupMembers" validate constraint "groupmembers_memberid_fkey";

alter table "public"."Groups" add constraint "Groups_registeredBy_fkey" FOREIGN KEY ("registeredBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Groups" validate constraint "Groups_registeredBy_fkey";

alter table "public"."Groups" add constraint "Groups_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Groups" validate constraint "Groups_updatedBy_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_borrowed_money_total(user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
SELECT "expenseId", "amount", "categoryId", "description", "payment", "registeredAt" FROM public."ExpenseStatus"
 LEFT OUTER JOIN public."Expenses" ON "Expenses"."id" = "ExpenseStatus"."expenseId"
WHERE "userId" = user_id ORDER BY "registeredAt" DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_expenses(user_id uuid)
 RETURNS TABLE(id uuid, "categoryId" smallint, "categoryName" character varying, payer uuid, "payerFirstName" character varying, "payerLastName" character varying, description text, payment numeric, date timestamp with time zone, "registeredAt" timestamp with time zone, "userIds" uuid[], "firstNames" character varying[], "lastNames" character varying[], paids boolean[], amounts numeric[])
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY
SELECT
  ex."id",
  ex."categoryId",
  ca."name" as "categoryName",
  ex."payer",
  usp."firstName" as "payerFirstName",
  usp."lastName" as "payerLastName",
  ex."description",
  ex."payment",
  ex."date",
  ex."registeredAt",
  ARRAY_AGG(es."userId" ORDER BY (es."userId" = ex."payer") DESC) as "userIds",
  ARRAY_AGG(us."firstName" ORDER BY (es."userId" = ex."payer") DESC) as "firstNames",
  ARRAY_AGG(us."lastName" ORDER BY (es."userId" = ex."payer") DESC) as "lastNames",
  ARRAY_AGG(es."paid" ORDER BY (es."userId" = ex."payer") DESC) as "paids",
  ARRAY_AGG(es."amount" ORDER BY (es."userId" = ex."payer") DESC) as "amounts"
FROM
  public."ExpenseStatus" es
  JOIN
  public."Users" us ON us."id" = es."userId"
  JOIN
  public."Expenses" ex ON ex."id" = es."expenseId"
  JOIN
  public."Users" usp ON usp."id" = ex."payer"
  JOIN
  public."Categories" ca ON ca."id" = ex."categoryId"

WHERE
  es."userId" = user_id OR
  es."userId" IN (
    SELECT "userId"
    FROM public."ExpenseStatus"
    WHERE "expenseId" IN (
      SELECT "expenseId"
      FROM public."ExpenseStatus"
      WHERE "userId" = user_id
    )
  )
  GROUP BY ex."id", usp."firstName", usp."lastName", ca."name"
ORDER BY
  ex."registeredAt" DESC;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_borrowed_amount(user_id uuid)
 RETURNS TABLE(payer uuid, "totalAmount" numeric, "firstName" character varying, "lastName" character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY
SELECT "Expenses"."payer", SUM("ExpenseStatus"."amount") AS totalAmount, "Users"."firstName", "Users"."lastName"
FROM public."ExpenseStatus"
LEFT JOIN public."Expenses" ON "Expenses"."id" = "ExpenseStatus"."expenseId"
LEFT JOIN public."Users" ON "Users"."id" = "Expenses"."payer"
WHERE "Expenses"."payer" <> user_id AND "ExpenseStatus"."userId" = user_id AND "ExpenseStatus"."paid" = FALSE
GROUP BY "Expenses"."payer", "Users"."firstName", "Users"."lastName";
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_lent_amount(user_id uuid)
 RETURNS TABLE("userId" uuid, "totalAmount" numeric, "firstName" character varying, "lastName" character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
RETURN QUERY
SELECT "ExpenseStatus"."userId", SUM("ExpenseStatus"."amount") AS totalAmount, "Users"."firstName", "Users"."lastName"
FROM public."ExpenseStatus"
LEFT JOIN public."Expenses" ON "Expenses"."id" = "ExpenseStatus"."expenseId"
LEFT JOIN public."Users" ON "Users"."id" = "ExpenseStatus"."userId"
WHERE "Expenses"."payer" = user_id AND "ExpenseStatus"."userId" <> user_id AND "ExpenseStatus"."paid" = FALSE
GROUP BY "ExpenseStatus"."userId", "Users"."firstName", "Users"."lastName";
END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_expense(group_name text, date timestamp with time zone, registered_by uuid, member_ids uuid[], member_paids boolean[], member_amounts numeric[], payer_id uuid, category_id integer, description text, payment numeric)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    group_id uuid;
    member_id uuid;
    expense_id uuid;
BEGIN
    -- Insert into Groups table
    INSERT INTO public."Groups" ("name", "registeredBy", "updatedBy")
    VALUES (group_name, registered_by, registered_by)
    RETURNING "id" INTO group_id;

    -- Insert into GroupMembers table
    FOREACH member_id IN ARRAY member_ids LOOP
        INSERT INTO "GroupMembers" ("groupId", "memberId")
        VALUES (group_id, member_id);
    END LOOP;

    -- Insert into Expenses table
    INSERT INTO public."Expenses" ("groupId", "payer", "categoryId", "description", "payment", "date", "registeredBy", "updatedBy")
    VALUES (group_id, payer_id, category_id, description, payment, date, registered_by, registered_by)
    RETURNING "id" INTO expense_id;

  --  Insert into Expense status table
   FOR i IN 1..array_length(member_ids, 1) LOOP
   INSERT INTO public."ExpenseStatus" ("expenseId", "userId", "paid", "amount", "updatedBy")
       VALUES (expense_id, member_ids[i], member_paids[i], member_amounts[i], registered_by);
    END LOOP;

END;
$function$
;


