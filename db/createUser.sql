insert into users (username, hash, color, isadmin)
	values(${username}, ${hash}, ${color}, ${isadmin})
	RETURNING *;