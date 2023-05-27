CREATE OR REPLACE FUNCTION get_user_friends(user_id uuid)
RETURNS TABLE (
    "id" uuid,
    "firstName" varchar,
    "lastName" varchar,
    "email" varchar
) AS $$
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
    uu.id = user_id OR uf.id = user_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_friendship(user_id uuid, friend_email varchar)
RETURNS integer AS $$
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
$$ LANGUAGE plpgsql;
