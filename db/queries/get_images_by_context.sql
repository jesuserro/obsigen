SELECT 
    id,
    context_id,
    context_type,
    type,
    path,
    alt_text
FROM 
    images
WHERE 
    context_id = ? AND context_type = ?;