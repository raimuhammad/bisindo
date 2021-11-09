import { useCallback } from 'react'

interface Options<T, MapData = any> {
  component: T
  makeProps?: (t: MapData) => any
  getKey?: (data: MapData) => MapData[keyof MapData]
  data: MapData[]
}

const ComponentMapper = ({ component: ChildNode, makeProps, getKey, data }: Options<any>) => (
  <>
    {data.map(item => {
      let key = getKey ? getKey(item) : item
      if (typeof item === 'object' && 'key' in item) {
        key = item.key
      }
      const properties = {
        ...(makeProps ? makeProps(item) : item),
        key
      }
      // eslint-disable-next-line react/jsx-key
      return <ChildNode {...properties} />
    })}
  </>
)

export function useComponentMapper<T, MapData = any>(properties: Options<T, MapData>) {
  return useCallback(() => <ComponentMapper {...properties} />, [properties])
}
