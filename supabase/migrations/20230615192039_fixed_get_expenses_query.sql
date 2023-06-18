alter table "public"."Categories" drop constraint "categories_name_key";

alter table "public"."Categories" drop constraint "categories_sequence_key";

alter table "public"."Categories" drop constraint "categories_pkey";

alter table "public"."Methods" drop constraint "methods_pkey";

drop index if exists "public"."categories_name_key";

drop index if exists "public"."categories_pkey";

drop index if exists "public"."categories_sequence_key";

drop index if exists "public"."methods_pkey";

drop table "public"."Categories";

drop table "public"."Methods";

drop table "public"."expense_data";

set check_function_bodies = off;

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
          'payerFirstName', usp."firstName",
          'payerLastName', usp."lastName",
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
    JOIN "Users" usp ON usp."id" = ex."payer"
    WHERE us."id" = user_id
    GROUP BY ex."id", ex."category", ex."payer", usp."firstName", usp."lastName", ex."description", ex."payment", ex."date", ex."settled"
    ORDER BY ex."registeredAt" DESC
  )
  INTO expense_data;
  
  RETURN expense_data;
END
$function$
;


