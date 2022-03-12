import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import {queryOrderBuyList} from '../../common/request/orderBuy'
import './index.scss'
import { OrderBuyArrayBto } from 'src/common/resultType/OrderBuy'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import SmallTab from '../../components/smallTab/index'
import NopicTab from '../../components/noPicTab/index'

interface IndexProps{
}
interface IndexState{
  OrderList: OrderBuyArrayBto[]
  pageNum: number
  pageMaxSize: number
  kind: string
}

export default class Index extends Component<IndexProps,IndexState> {
  $instance = getCurrentInstance();
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
    const router = this.$instance.router;
    const id = router?.params.id? router.params.id : '0';
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

  refresh = async() => {
    const {kind} = this.state;
    const res = await queryOrderBuyList({kind:kind});
    console.log(res.data);
    this.setState({
      OrderList: res.data,
      pageNum: res.pageNum,
      pageMaxSize: res.pageMaxSize,
    })
  }
  async onPullDownRefresh(){
    Taro.showNavigationBarLoading();
    this.refresh();
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
    const {OrderList} = this.state;
    return (
        <View className='height'>
          <View className='tab-content'>
          {OrderList?.map((obj,index) => (
            obj.picture?
              <SmallTab orderList={obj} />
              :
              <NopicTab orderList={obj} />
          ))}
        </View>
      </View>
    )
  }
}
