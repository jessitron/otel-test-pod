const query = `{
  "time_range": 7200,
  "granularity": 60,
  "breakdowns": [
      "DBInstanceIdentifier"
  ],
  "calculations": [
      {
          "op": "MAX",
          "column": "amazonaws.com/AWS/RDS/CPUUtilization.max"
      }
  ],
  "filters": [
      {
          "column": "DBInstanceIdentifier",
          "op": "exists"
      }
  ],
  "filter_combination": "AND",
  "orders": [
      {
          "column": "amazonaws.com/AWS/RDS/CPUUtilization.max",
          "op": "MAX",
          "order": "descending"
      }
  ],
  "limit": 1000
}`;

const prefix = "https://ui-dogfood.honeycomb.io/prod/environments/prod/datasets/cloudwatch-otlp?query="

const url = prefix + encodeURI(JSON.stringify(JSON.parse(query)));

console.log(url)
