/**
 * Utils
 */

// Remove all non-alphanumeric characters from a string
const sanitize = (fileName: string) => fileName.trim().replace(/[^\w.-]/g, "")

/**
 * Safely parse an integer from a string
 */
const parseIntSafe = (input: string) => {
  const int = parseInt(input, 10)

  return Number.isNaN(int) ? 0 : int
}

/**
 * Functions
 */

interface ExtractedData {
  name: string
  height: number
  width: number
  year: number
}

/**
 * Extract data from a filename
 */
const extractData = (filename: string): ExtractedData => {
  console.log(filename)
  const pattern = /^([a-z0-9-]+)_(\d+)x(\d+)_(\d{4})\.([a-z0-9-]+)$/i
  const [, name, width, height, year, extension] = filename.match(pattern)!

  return {
    name: sanitize(name),
    width: parseIntSafe(width),
    height: parseIntSafe(height),
    year: parseIntSafe(year),
  }
}

/**
 * Tests
 */

interface FilenameParts {
  full: string
  name: string
  width: number
  height: number
  year: number
  extension: string
}

/**
 * Generate a random filename
 */
const generateRandomFilename = (): FilenameParts => {
  const name = generateRandomString(5)
  const { width, height } = generateRandomDimensions()
  const year = generateRandomInteger(2000, 2023)
  const extension = generateRandomString(3)

  return {
    full: `${name}_${width}x${height}_${year}.${extension}`,
    name,
    width,
    height,
    year,
    extension,
  }
}

/**
 * Generate a random string
 */
const generateRandomString = (randomStringLength: number) => {
  let result = ""
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789-"

  for (let i = 0; i < randomStringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

/**
 * Generate random dimensions
 */
const generateRandomDimensions = (): { width: number; height: number } => ({
  width: generateRandomInteger(100, 1000),
  height: generateRandomInteger(100, 1000),
})

/**
 * Generate a random integer
 */
const generateRandomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Generate test data
 */
const generateTestData = (count: number): FilenameParts[] =>
  Array.from({ length: count }).map(() => generateRandomFilename())

/**
 * Test extractData
 */
const testExportData = (numberOfTests: number) => {
  const data = generateTestData(numberOfTests)

  data.forEach(({ full, name, width, height, year }) => {
    const extractedData = extractData(full)

    const isNameValid = extractedData.name === name
    const isHeightValid = extractedData.height === height
    const isWidthValid = extractedData.width === width
    const isYearValid = extractedData.year === year

    if (!isNameValid || !isHeightValid || !isWidthValid || !isYearValid) {
      throw new Error("Invalid data")
    }
  })

  return "Valid data"
}

console.log(testExportData(600))

export {}
