alter table "public"."Expenses" drop constraint "Expenses_pkey";

drop index if exists "public"."Expenses_pkey";

CREATE UNIQUE INDEX expenses_pkey ON public."Expenses" USING btree (id);

alter table "public"."Expenses" add constraint "expenses_pkey" PRIMARY KEY using index "expenses_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_expense(group_name text, date timestamp with time zone, registered_by uuid, member_ids uuid[], member_paids boolean[], member_amounts numeric[], payer_id uuid, category_id integer, description text, payment numeric)
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
    INSERT INTO public."Expenses" ("groupId", "payer", "categoryId", "description", "payment", "date", "settled", "registeredBy", "updatedBy")
    VALUES (group_id, payer_id, category_id, description, payment, date, all_paid, registered_by, registered_by)
    RETURNING "id" INTO expense_id;

  --  Insert into Expense status table
   FOR i IN 1..array_length(member_ids, 1) LOOP
   INSERT INTO public."ExpenseStatus" ("expenseId", "userId", "paid", "amount", "updatedBy")
       VALUES (expense_id, member_ids[i], member_paids[i], member_amounts[i], registered_by);
    END LOOP;

END;
$function$
;


