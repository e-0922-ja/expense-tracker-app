create table "public"."Categories" (
    "id" smallint generated by default as identity not null,
    "sequence" smallint,
    "name" character varying
);


create table "public"."ExpenseStatus" (
    "expenseId" uuid not null,
    "userId" uuid not null,
    "paid" boolean default false,
    "amount" numeric,
    "updatedAt" timestamp with time zone default now(),
    "updatedBy" uuid
);


create table "public"."Expenses" (
    "id" uuid not null default gen_random_uuid(),
    "groupId" uuid,
    "payer" uuid,
    "description" text,
    "payment" numeric,
    "settled" boolean default false,
    "registeredAt" timestamp with time zone default now(),
    "registeredBy" uuid,
    "updatedAt" timestamp with time zone default now(),
    "updatedBy" uuid,
    "date" timestamp with time zone default now(),
    "category" character varying
);


create table "public"."Friendships" (
    "id" uuid not null default gen_random_uuid(),
    "userId" uuid,
    "friendId" uuid,
    "friendEmail" character varying,
    "registeredAt" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "updatedAt" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "statusId" smallint
);


create table "public"."GroupMembers" (
    "groupId" uuid not null,
    "memberId" uuid not null
);


create table "public"."Groups" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying,
    "registeredAt" timestamp with time zone default now(),
    "registeredBy" uuid,
    "updatedAt" timestamp with time zone default now(),
    "updatedBy" uuid
);


create table "public"."Methods" (
    "id" smallint generated by default as identity not null,
    "sequence" smallint,
    "name" character varying
);


create table "public"."Status" (
    "id" smallint generated by default as identity not null,
    "statusName" character varying
);


create table "public"."Users" (
    "firstName" character varying,
    "lastName" character varying,
    "password" text,
    "registeredAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "id" uuid not null,
    "email" character varying
);


create table "public"."expense_data" (
    "jsonb_agg" jsonb
);


CREATE UNIQUE INDEX categories_name_key ON public."Categories" USING btree (name);

CREATE UNIQUE INDEX categories_pkey ON public."Categories" USING btree (id);

CREATE UNIQUE INDEX categories_sequence_key ON public."Categories" USING btree (sequence);

CREATE UNIQUE INDEX expenses_pkey ON public."Expenses" USING btree (id);

CREATE UNIQUE INDEX expensestatus_pkey ON public."ExpenseStatus" USING btree ("expenseId", "userId");

CREATE UNIQUE INDEX friendships_pkey ON public."Friendships" USING btree (id);

CREATE UNIQUE INDEX groupmembers_pkey ON public."GroupMembers" USING btree ("groupId", "memberId");

CREATE UNIQUE INDEX groups_pkey ON public."Groups" USING btree (id);

CREATE UNIQUE INDEX methods_pkey ON public."Methods" USING btree (id);

CREATE UNIQUE INDEX status_pkey ON public."Status" USING btree (id);

CREATE UNIQUE INDEX status_statusname_key ON public."Status" USING btree ("statusName");

CREATE UNIQUE INDEX users_pkey ON public."Users" USING btree (id);

alter table "public"."Categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."ExpenseStatus" add constraint "expensestatus_pkey" PRIMARY KEY using index "expensestatus_pkey";

alter table "public"."Expenses" add constraint "expenses_pkey" PRIMARY KEY using index "expenses_pkey";

alter table "public"."Friendships" add constraint "friendships_pkey" PRIMARY KEY using index "friendships_pkey";

alter table "public"."GroupMembers" add constraint "groupmembers_pkey" PRIMARY KEY using index "groupmembers_pkey";

alter table "public"."Groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."Methods" add constraint "methods_pkey" PRIMARY KEY using index "methods_pkey";

alter table "public"."Status" add constraint "status_pkey" PRIMARY KEY using index "status_pkey";

alter table "public"."Users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."Categories" add constraint "categories_name_key" UNIQUE using index "categories_name_key";

alter table "public"."Categories" add constraint "categories_sequence_key" UNIQUE using index "categories_sequence_key";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expenses"(id) ON DELETE CASCADE not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_expenseId_fkey";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Users"(id) ON DELETE SET NULL not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_updatedBy_fkey";

alter table "public"."ExpenseStatus" add constraint "ExpenseStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON DELETE CASCADE not valid;

alter table "public"."ExpenseStatus" validate constraint "ExpenseStatus_userId_fkey";

alter table "public"."Expenses" add constraint "Expenses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_groupId_fkey";

alter table "public"."Expenses" add constraint "Expenses_payer_fkey" FOREIGN KEY (payer) REFERENCES "Users"(id) not valid;

alter table "public"."Expenses" validate constraint "Expenses_payer_fkey";

alter table "public"."Expenses" add constraint "Expenses_registeredBy_fkey" FOREIGN KEY ("registeredBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_registeredBy_fkey";

alter table "public"."Expenses" add constraint "Expenses_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Expenses" validate constraint "Expenses_updatedBy_fkey";

alter table "public"."Friendships" add constraint "friendships_friendid_fkey" FOREIGN KEY ("friendId") REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."Friendships" validate constraint "friendships_friendid_fkey";

alter table "public"."Friendships" add constraint "friendships_statusid_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"(id) ON DELETE RESTRICT not valid;

alter table "public"."Friendships" validate constraint "friendships_statusid_fkey";

alter table "public"."Friendships" add constraint "friendships_userid_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."Friendships" validate constraint "friendships_userid_fkey";

alter table "public"."GroupMembers" add constraint "groupmembers_groupid_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"(id) ON DELETE CASCADE not valid;

alter table "public"."GroupMembers" validate constraint "groupmembers_groupid_fkey";

alter table "public"."GroupMembers" add constraint "groupmembers_memberid_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"(id) ON DELETE RESTRICT not valid;

alter table "public"."GroupMembers" validate constraint "groupmembers_memberid_fkey";

alter table "public"."Groups" add constraint "Groups_registeredBy_fkey" FOREIGN KEY ("registeredBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Groups" validate constraint "Groups_registeredBy_fkey";

alter table "public"."Groups" add constraint "Groups_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."Groups" validate constraint "Groups_updatedBy_fkey";

alter table "public"."Status" add constraint "status_statusname_key" UNIQUE using index "status_statusname_key";

alter table "public"."Users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."Users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_friendship(user_id uuid, friend_email character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN (
SELECT
    COUNT(*)
FROM
    "Friendships" f
LEFT OUTER JOIN
    "Users" uu ON f."friendId" = uu.id
LEFT OUTER JOIN
    "Users" uf ON f."userId" = uf.id
WHERE
    (uu.id = user_id OR uf.id = user_id) AND
    (uu.email = friend_email OR uf.email = friend_email OR f."friendEmail" = friend_email));
END;
$function$
;

create type "public"."checked_member_type" as ("user_id" uuid, "paid" boolean);

CREATE OR REPLACE FUNCTION public.get_expenses(user_id uuid)
 RETURNS jsonb[]
 LANGUAGE plpgsql
AS $function$
DECLARE
  expense_data jsonb[];
BEGIN
  SELECT ARRAY(
    SELECT
      jsonb_build_object(
          'id', ex."id",
          'category', ex."category",
          'payer', ex."payer",
          'payerFirstName', us."firstName",
          'payerLastName', us."lastName",
          'description', ex."description",
          'payment', ex."payment",
          'date', ex."date",
          'settled', ex."settled",
          'members', (
            SELECT json_agg(json_build_object(
              'id', ies."userId",
              'firstName', ius."firstName",
              'lastName', ius."lastName",
              'paid', ies."paid",
              'amount', ies."amount"
            ) ORDER BY
              CASE
                WHEN ies."userId" = ex."payer" THEN 0
                ELSE 1
              END
            )
            FROM "ExpenseStatus" ies
            JOIN "Users" ius ON ius."id" = ies."userId"
            WHERE ies."expenseId" = ex."id"
          )
      )
    FROM "Expenses" ex
    JOIN "ExpenseStatus" es ON ex."id" = es."expenseId"
    JOIN "Users" us ON us."id" = es."userId"
    WHERE us."id" = user_id
    GROUP BY ex."id", ex."category", ex."payer", us."firstName", us."lastName", ex."description", ex."payment", ex."date", ex."settled"
    ORDER BY ex."registeredAt" DESC
  )
  INTO expense_data;
  
  RETURN expense_data;
END
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

CREATE OR REPLACE FUNCTION public.get_user_friends(user_id uuid)
 RETURNS TABLE(id uuid, "firstName" character varying, "lastName" character varying, email character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
SELECT
CASE WHEN uu.id = user_id THEN uf.id ELSE uu.id END AS "id",
    CASE WHEN uu.id = user_id THEN uf."firstName" ELSE uu."firstName" END AS "firstName",
    CASE WHEN uu.id = user_id THEN uf."lastName" ELSE uu."lastName" END AS "lastName",
    CASE WHEN uu.id = user_id AND uf.email IS NOT NULL THEN uf.email
         WHEN uu.id <> user_id AND uu.email IS NOT NULL THEN uu.email
         ELSE f."friendEmail" END AS email
FROM
    "Friendships" f
LEFT OUTER JOIN
    "Users" uu ON f."friendId" = uu.id
LEFT OUTER JOIN
    "Users" uf ON f."userId" = uf.id
WHERE
    uu.id = user_id OR uf.id = user_id
ORDER BY
    f."registeredAt" DESC;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.insert_expense(group_name text, date timestamp with time zone, registered_by uuid, member_ids uuid[], member_paids boolean[], member_amounts numeric[], payer_id uuid, category character varying, description text, payment numeric)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    group_id uuid;
    member_id uuid;
    expense_id uuid;
    member_paid boolean;
    all_paid boolean := true;
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

    -- For settled conditioin
    FOREACH member_paid IN ARRAY member_paids LOOP
       IF NOT member_paid THEN
       all_paid := false;
       END IF;
    END LOOP;

    -- Insert into Expenses table
    INSERT INTO public."Expenses" ("groupId", "payer", "category", "description", "payment", "date", "settled", "registeredBy", "updatedBy")
    VALUES (group_id, payer_id, category, description, payment, date, all_paid, registered_by, registered_by)
    RETURNING "id" INTO expense_id;

  --  Insert into Expense status table
   FOR i IN 1..array_length(member_ids, 1) LOOP
   INSERT INTO public."ExpenseStatus" ("expenseId", "userId", "paid", "amount", "updatedBy")
       VALUES (expense_id, member_ids[i], member_paids[i], member_amounts[i], registered_by);
    END LOOP;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_members_paid(expense_id uuid, checked_members text, update_by uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  member_data record;
  all_paid boolean := true;
BEGIN
  FOR member_data IN
    SELECT * FROM jsonb_to_recordset(checked_members::jsonb) AS x("id" uuid, "paid" boolean)
  LOOP
    UPDATE "ExpenseStatus"
    SET "paid" = member_data."paid", "updatedBy" = update_by, "updatedAt" = now() 
    WHERE "expenseId" = expense_id AND "userId" = member_data."id";

   IF NOT member_data."paid" THEN
      all_paid := false;
    END IF;
    
  END LOOP;
  
  UPDATE "Expenses"
  SET "settled" = all_paid, "updatedBy" = update_by, "updatedAt" = now()
  WHERE "id" = expense_id;

END;
$function$
;

