export const TestSourceType = {
  REPOSITORY: 'repository',
  TEST_CREATOR: 'test_creator',
}

export const Chart = {
  HEIGHT: 400,
}

export const TestRunStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  FINISHED: 'FINISHED',
  SUCCEEDED: 'SUCCEEDED',
  TERMINATED: 'TERMINATED',
  ERROR: 'ERROR',
  MONITORING: 'MONITORING',
  UNKNOWN: 'UNKNOWN',
  FAILED: 'FAILED',
}

export const TestRunStageStatus = {
  NOT_STARTED: 'NOT_STARTED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  TERMINATED: 'TERMINATED',
  ERROR: 'ERROR',
  FINISHED: 'FINISHED',
}

export const AUTH_COOKIE_NAME = 'AUTH_TOKEN'

export const AuthServiceName = {
  KEYCLOAK: 'keycloak',
  BOLT: 'bolt',
}
