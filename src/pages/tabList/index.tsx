import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {queryOrderBuyList} from '../../common/request/orderBuy'
import './index.scss'
import { OrderBuyArrayBto } from 'src/common/resultType/OrderBuy'
import Taro from '@tarojs/taro'

interface IndexProps{
}
interface IndexState{
  OrderList: OrderBuyArrayBto[]
  pageNum: number
  pageMaxSize: number
  kind: string
}

export default class Index extends Component<IndexProps,IndexState> {
  $router: any
  constructor(props:IndexProps){
    super(props)
    this.state = {
      OrderList: [] as OrderBuyArrayBto[],
      pageNum: 0,
      pageMaxSize: 10,
      kind: '0'
      }
    }
  componentWillMount () { }

  async componentDidMount () {
    const id = this.$router.params.id;
    const res = await queryOrderBuyList({kind: id});
    this.setState({
      OrderList: res.data,
      pageNum: res.pageNum,
      pageMaxSize: res.pageMaxSize,
      kind: id
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  async onPullDownRefresh(){
    const {kind} = this.state;
    Taro.showNavigationBarLoading();
    const res = await queryOrderBuyList({kind:kind});
    this.setState({
      OrderList: res.data,
      pageNum: res.pageNum,
      pageMaxSize: res.pageMaxSize,
    })
    Taro.hideNavigationBarLoading();
    Taro.stopPullDownRefresh();
}

  async onReachBottom(){
    const {pageMaxSize,pageNum,OrderList,kind} = this.state;
    const hasNext:boolean = pageMaxSize === pageNum ? false : true;
    if(hasNext){
      const num = pageNum + 1;
      const res = await queryOrderBuyList({kind:kind,page:num + ''});
      this.setState({
        OrderList: OrderList.concat(res.data),
        pageNum: res.pageNum,
        pageMaxSize: res.pageMaxSize
      })
    }
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
