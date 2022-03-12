import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface IndexProps{
}
interface IndexState{
}
export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props);
    this.state={
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
      </View>
    )
  }
}
