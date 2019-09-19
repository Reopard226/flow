# Set up cloudwatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "elastic_log_group" {
  name              = "/ecs/elastic"
  retention_in_days = 30

  tags {
    Name = "elastic-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "elastic_log_stream" {
  name           = "elastic-log-stream"
  log_group_name = "${aws_cloudwatch_log_group.elastic_log_group.name}"
}