import { getDataForChart, getUniqueGroupNames, createEmptyGroups } from './module'

describe('module:', () => {
  describe('get data for chart: ', () => {
    test('get data for chart', () => {
      const exampleConfig = {
        type: 'line',
        node_name: 'testNodeName',
        x_data_key: 'timestamp',
        x_format: 'number',
        y_data_key: 'testValue',
        y_format: 'number',
        y_label: 'testLabel',
      }
      const exampleData = [
        {
          timestamp: 1234,
          data: {
            data: {
              testNodeName: [
                {
                  testValue: 1,
                  testLabel: 'label1',
                },
                {
                  testValue: 2,
                  testLabel: 'label2',
                },
              ],
            },
          },
        },
      ]
      expect(getDataForChart(exampleConfig, exampleData)).toEqual({
        data: [
          {
            groups: { label1: 1, label2: 2 },
            timestamp: 1234,
          },
        ],
        groupNames: ['label1', 'label2'],
      })
    })
  })
  describe('get unique group names:', () => {
    test('get unique groupnames', () => {
      const label = 'name'
      const ticks = [
        {
          timestamp: 1234,
          data: null,
        },
      ]
      expect(getUniqueGroupNames(ticks, label)).toEqual([])
    })

    test('get unique groupsnames from null/undefined array', () => {
      const label = 'name'
      const ticks = [
        {
          timestamp: 1234,
          data: [
            undefined,
            { name: 'testName1', value: 13 },
            { name: 'testName1', value: 14 },
            { name: 'testName2', value: 6 },
            null,
          ],
        },
      ]
      expect(getUniqueGroupNames(ticks, label)).toEqual(['testName1', 'testName2'])
    })
  })

  describe('create empty groups:', () => {
    test('create empty groups object from array', () => {
      const groupsArray = ['testName1', 'testName2']
      expect(createEmptyGroups(groupsArray)).toEqual({
        testName1: null,
        testName2: null,
      })
    })
  })
})
