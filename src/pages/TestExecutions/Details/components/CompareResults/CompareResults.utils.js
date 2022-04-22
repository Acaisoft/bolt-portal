export function getFilteredConfigurations(allConfigurations, currentExecution) {
  return allConfigurations.filter(({ executions }) => {
    return executions?.filter(({ id }) => id !== currentExecution)?.length
  })
}
