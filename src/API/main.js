import { defaultInstance } from './index'

//생성된 axios인스턴스를 사용해 API호출

export const getSelectList = async () => {
  try{
    const{ data } = await defaultInstance.get(
      'selectlist',
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getLeadtime = async (machinery, items, part1) => {
  try{
    const{ data } = await defaultInstance.get(
      `leadtime?machinery=${machinery}&items=${items}&part1=${part1}`,
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPastLeadtime = async (machinery, items, part1) => {
  try{
    const{ data } = await defaultInstance.get(
      `past_leadtime?machinery=${machinery}&items=${items}&part1=${part1}`,
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAutoSearch = async () => {
  try{
    const{ data } = await defaultInstance.get(
      'search',
    )
    return data
  } catch (error) {
    console.log(error)
  }
}