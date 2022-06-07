import { ref, computed, onMounted } from 'vue'
import { paddingSide, paddingTop } from './options'

const data = [
  { value: 5, mark: '31.01' },
  { value: 11, mark: '01.02' },
  { value: 6, mark: '02.02' },
  { value: 12, mark: '03.02' },
  { value: 14, mark: '04.02' },
  { value: 10, mark: '05.02' },
  { value: 18, mark: '06.02' },
  { value: 17, mark: '07.02' },
]

const useAppChart = () => {

  const itemList = ref( data )

  const min = computed( () => 0 )
  const max = computed( () => 20 )
  const average = computed( () => 10 )

  const valueList = computed( () => itemList.value.map( item => item.value ) )
  const ratioList = computed( () => valueList.value.map( value => value / max.value ) )
  const percentageList = computed( () => ratioList.value.map( ratio => ratio * 100 ) )

  const itemRatio = computed( () => 1 / ( valueList.value.length - 1 ) )
  const itemPercentage = computed( () => itemRatio.value * 100 )
  
  const ordinateList = computed( () => valueList.value.map( ( value, idx ) => idx * itemPercentage.value ) )
  const ordinateRatioList = computed( () => valueList.value.map( ( value, idx ) => idx * itemRatio.value ) )

  const clipPathBackground = computed( () => {
    const list = []
    valueList.value.forEach( ( value, idx ) => (
      list.push( `${ ordinateList.value[ idx ] }% ${ percentageList.value[ idx ] }%` )
    ) )
    return `polygon(0% 0%, ${ list.join( ', ' ) }, 100% 0%)`
  } )

  const isMounted = ref( false )
  onMounted( () => isMounted.value = true )

  const chartSvg = ref( null )
  const chartBoundingClientRect = computed( () => {
    if ( isMounted.value ) return chartSvg.value.getBoundingClientRect()
  } )
  const chartWidth = computed( () => {
    if ( isMounted.value ) return chartBoundingClientRect.value.width
  } )
  const chartHeight = computed( () => {
    if ( isMounted.value ) return chartBoundingClientRect.value.height
  } )

  const linePoints = computed( () => {
    if ( !isMounted.value ) return ''
    const list = []
    valueList.value.forEach( ( value, idx ) => {
      const x = ordinateRatioList.value[ idx ] * ( chartWidth.value - 2 * paddingSide ) + paddingSide
      const y = ratioList.value[ idx ] * ( chartHeight.value - paddingTop )
      list.push( `${ x }, ${ y }` )
    } )
    return list.join( ' ' )
  } )

  const markList = computed( () => {
    return [ '31.01', '01.02', '02.02', '03.02', '04.02', '05.02', '06.02', '07.02' ]
  } )

  const intervalList = computed( () => {
    return [ max.value, null, average.value, null, min.value ]
  } )

  return { markList, intervalList, clipPathBackground, linePoints, chartSvg }
}

export default useAppChart