import { ref, computed, onMounted } from 'vue'
import { paddingSide, paddingTop, promptWidth, promptMargin } from './options'

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

  const markList = computed( () => {
    return itemList.value.map( value => value.mark )
  } )

  const intervalList = computed( () => {
    return [ max.value, null, average.value, null, min.value ]
  } )

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

  const xPointList = computed( () => {
    if ( !isMounted.value ) return ''
    const list = []
    valueList.value.forEach( ( value, idx ) => {
      const x = ordinateRatioList.value[ idx ] * ( chartWidth.value - 2 * paddingSide ) + paddingSide
      list.push( x )
    } )
    return list
  } )
  const yPointList = computed( () => {
    if ( !isMounted.value ) return ''
    const list = []
    valueList.value.forEach( ( value, idx ) => {
      const y = ratioList.value[ idx ] * ( chartHeight.value - paddingTop )
      list.push( y )
    } )
    return list
  } )

  const linePoints = computed( () => {
    if ( !isMounted.value ) return ''
    const list = []
    valueList.value.forEach( ( value, idx ) => {
      const x = xPointList.value[ idx ]
      const y = yPointList.value[ idx ]
      list.push( `${ x }, ${ y }` )
    } )
    return list.join( ' ' )
  } )
  
  const itemWidth = computed( () => {
    if ( !isMounted.value ) return
    return itemRatio.value * ( chartWidth.value - 2 * paddingSide )
  } )

  const rectXList = computed( () => {
    if ( !isMounted.value ) return ''
    return xPointList.value.map( x => x - ( itemWidth.value / 2 ) )
  } )

  const promptIndent = paddingSide / 2

  const xPromptList = computed( () => {
    if ( !isMounted.value ) return ''
    return xPointList.value.map( x => {
      const result = x - ( promptWidth / 2 )
      if ( result < 0 ) return promptIndent
      if ( ( result + promptWidth ) > ( paddingSide + chartWidth.value ) ) {
        return chartWidth.value - promptWidth - promptIndent
      }
      return result
    } )
  } )
  const yPromptList = computed( () => {
    if ( !isMounted.value ) return ''
    return yPointList.value.map( y => {
      return y + promptMargin
    } )
  } )

  return {
    markList, intervalList, clipPathBackground, linePoints, chartSvg, valueList, xPointList, yPointList,
    chartHeight, itemWidth, rectXList,
    xPromptList, yPromptList
  }
}

export default useAppChart