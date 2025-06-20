const { conn } = require('../config/connections')

const getAllCharacters = async () => {
  const result = await conn.query(`
    SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c1.primary_image, c2.secondary_image, b.name AS brand_name
    FROM products p
    LEFT JOIN content c1 ON p.id = c1.product_id
    LEFT JOIN content c2 ON p.id = c2.product_id
    LEFT JOIN brands b ON p.brand_id = b.id;
  `)
  return result.rows
}

const getCharacters = async ({ search, sort, minPrice, maxPrice, limit, offset }) => {
  let query = `
    SELECT p.id, p.name, p.price, p.payments, c.primary_image, c.secondary_image, b.name AS brand_name
    FROM products p
    LEFT JOIN content c ON p.id = c.product_id
    LEFT JOIN brands b ON p.brand_id = b.id
  `

  const conditions = []
  const params = []
  let paramIndex = 1

  if (search) {
    conditions.push(`(p.name ILIKE $${paramIndex} OR b.name ILIKE $${paramIndex})`)
    params.push(`%${search}%`)
    paramIndex++
  }
  if (minPrice !== null) {
    conditions.push(`p.price >= $${paramIndex}`)
    params.push(minPrice)
    paramIndex++
  }
  if (maxPrice !== null) {
    conditions.push(`p.price <= $${paramIndex}`)
    params.push(maxPrice)
    paramIndex++
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }

  if (sort === 'precio_asc') {
    query += ' ORDER BY p.price ASC'
  } else if (sort === 'precio_desc') {
    query += ' ORDER BY p.price DESC'
  } else {
    query += ' ORDER BY p.id ASC'
  }

  query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
  params.push(limit, offset)

  const result = await conn.query(query, params)
  return result.rows
}

const countCharacters = async ({ search, minPrice, maxPrice }) => {
  let query = 'SELECT COUNT(*) AS total FROM products p LEFT JOIN brands b ON p.brand_id = b.id'
  const conditions = []
  const params = []
  let paramIndex = 1

  if (search) {
    conditions.push(`(p.name ILIKE $${paramIndex} OR b.name ILIKE $${paramIndex})`)
    params.push(`%${search}%`)
    paramIndex++
  }
  if (minPrice !== null) {
    conditions.push(`p.price >= $${paramIndex}`)
    params.push(minPrice)
    paramIndex++
  }
  if (maxPrice !== null) {
    conditions.push(`p.price <= $${paramIndex}`)
    params.push(maxPrice)
    paramIndex++
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }

  const result = await conn.query(query, params)
  return Number(result.rows[0].total)
}

const getCharacterById = async (productId) => {
  const result = await conn.query(`
    SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c1.primary_image, c2.secondary_image, b.name AS brand_name
    FROM products p
    LEFT JOIN content c1 ON p.id = c1.product_id
    LEFT JOIN content c2 ON p.id = c2.product_id
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.id = $1;
  `, [productId])
  return result.rows
}

const getCharactersByUser = async (userId) => {
  const result = await conn.query(`
    SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c1.primary_image, c2.secondary_image, b.name AS brand_name
    FROM products p
    LEFT JOIN content c1 ON p.id = c1.product_id
    LEFT JOIN content c2 ON p.id = c2.product_id
    LEFT JOIN brands b ON p.brand_id = b.id
    WHERE p.user_id = $1;
  `, [userId])
  return result.rows
}

const getBrandCharacters = async (brand) => {
  const result = await conn.query(`
    SELECT p.id, p.name, p.price, p.payments, p.description, p.stock, c1.primary_image, c2.secondary_image, b.name AS brand_name
    FROM products p
    LEFT JOIN content c1 ON p.id = c1.product_id
    LEFT JOIN content c2 ON p.id = c2.product_id
    JOIN brands b ON p.brand_id = b.id
    WHERE b.name = $1;
  `, [brand])
  return result.rows
}

const addCharacter = async (data, files, userId) => {
  const brandResult = await conn.query(
    'SELECT id FROM brands WHERE name = $1', [data.marca]
  )

  let brandId
  if (brandResult.rows.length > 0) {
    brandId = brandResult.rows[0].id
  } else {
    const newBrand = await conn.query(
      'INSERT INTO brands (name) VALUES ($1) RETURNING id', [data.marca]
    )
    brandId = newBrand.rows[0].id
  }

  const payments = data.cuotas + ' CUOTAS SIN INTERES'
  const result = await conn.query(
    `INSERT INTO products (brand_id, name, price, payments, description, stock, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [brandId, data.nombre, data.precio, payments, data.descripcion, data.stock, userId]
  )

  const productId = result.rows[0].id
  if (files && files.length > 0) {
    const primaryImage = '../../Multimedia/FunkosInterior/' + files[0].originalname
    const secondaryImage = '../../Multimedia/FunkosCajas/' + files[1].originalname

    await conn.query(
      `INSERT INTO content (product_id, primary_image, secondary_image)
       VALUES ($1, $2, $3)`,
      [productId, primaryImage, secondaryImage]
    )
  }

  return productId
}

module.exports = {
  getCharacterById,
  getCharactersByUser,
  getAllCharacters,
  getBrandCharacters,
  getCharacters,
  countCharacters,
  addCharacter
}
