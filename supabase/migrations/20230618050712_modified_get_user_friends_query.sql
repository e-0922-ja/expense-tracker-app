drop function if exists "public"."get_user_friends"(user_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_friends(user_id uuid)
 RETURNS TABLE(id uuid, "firstName" character varying, "lastName" character varying, email character varying, "statusId" smallint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
SELECT
CASE WHEN uu.id = user_id THEN uf.id ELSE uu.id END AS "id",
CASE WHEN f."statusId" = 1 THEN NULL
     WHEN uu.id = user_id THEN uf."firstName"
     ELSE uu."firstName" END AS "firstName",
CASE WHEN f."statusId" = 1 THEN NULL
     WHEN uu.id = user_id THEN uf."lastName"
     ELSE uu."lastName" END AS "lastName",
CASE WHEN uu.id = user_id AND uf.email IS NOT NULL THEN uf.email
     WHEN uu.id <> user_id AND uu.email IS NOT NULL THEN uu.email
     ELSE f."friendEmail" END AS "email",
f."statusId" AS "statusId"
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


