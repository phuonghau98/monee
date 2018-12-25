export const recordsFilterBy = (by = '', records) => {
  if (by === '') return records
  if (records.length === 0) return []
  const requestTime = new Date()
  const rqYear = requestTime.getFullYear()
  const rqMonth = requestTime.getMonth()
  const rqDate = requestTime.getDate()
  let startAt, endAt, result

  switch (by) {
    case 'today':
      startAt = new Date(rqYear, rqMonth, rqDate)
      endAt = new Date(rqYear, rqMonth, rqDate + 1)
      break

    case 'thismonth':
      startAt = new Date(rqYear, rqMonth)
      endAt = new Date(rqYear, rqMonth + 1)
      break

    case 'lastmonth':
      startAt = new Date(rqYear, rqMonth - 1)
      endAt = new Date(rqYear, rqMonth)
      break
  }

  result = records.filter((record) => {
    return startAt <= new Date(record.date) && endAt > new Date(record.date)
  })
  return result
}

export const amountSum = (sum, currentRecord) => {
  return sum + currentRecord.amount
}