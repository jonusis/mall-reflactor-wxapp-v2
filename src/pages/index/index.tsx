import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtDivider, AtGrid, AtSearchBar } from 'taro-ui'
import swiper1 from '../../static/image/pintuans3.png'
import swiper2 from '../../static/image/pintuans4.png'
import waimai from '../../static/image/waimai.png'
import shop from '../../static/image/shop.png'
import travel from '../../static/image/travel.png'
import huiyuan from '../../static/image/huiyuan.png'
import qita from '../../static/image/qita.png'




import './index.scss'
import Taro from '@tarojs/taro'
import SmallTab from '../../components/smallTab'
import NopicTab from '../../components/noPicTab'
import { queryOrderBuyList } from '../../common/request/orderBuy'
import { OrderBuyArrayBto } from '../../common/resultType/OrderBuy'

interface IndexProps{

}
interface IndexState{
  searchBar:string
  OrderList:OrderBuyArrayBto[]
}
export default class Index extends Component<IndexProps,IndexState> {
  constructor(props:IndexProps){
    super(props);
    this.state={
      searchBar:"",
      OrderList:[] as OrderBuyArrayBto[],
    }
  }

  componentWillMount () { }

  async componentDidMount () {
    const res1 = await queryOrderBuyList({kind: '0',page:'1',pagesize:'3'});
    const res2 = await queryOrderBuyList({kind: '1',page:'1',pagesize:'3'});
    const res3 = await queryOrderBuyList({kind: '2',page:'1',pagesize:'3'});
    const OrderList:OrderBuyArrayBto[] = res1.data.concat(res2.data).concat(res3.data);
    OrderList.sort((v1,v2) => {return Math.random()-0.5});
    this.setState({
      OrderList: OrderList,
    })
    OrderList
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChangeSearchBar = (value: string) => {
    this.setState({
      searchBar:value
    })
  }

  render () {
    const {searchBar,OrderList} = this.state;
    return (
      <View className='index'>
        <AtSearchBar
        value={searchBar} 
        onChange={this.onChangeSearchBar}
        />
        <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots>
            <SwiperItem>
              <View className='demo-text-1'>
                <Image
                  style='width: 100%;height: 150px;background: #fff;'
                  src={swiper1}
                />
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-2' style={{display: 'flex',justifyContent:'center'}}>
                <Image
                  style='width: 220px;height: 160px;background: #fff;'
                  src={swiper2}
                />
              </View>
            </SwiperItem>
          </Swiper>
          <AtGrid onClick={(_item,index:number):void => {Taro.navigateTo({url:`/pages/tabList/index?id=${index}`})}}
          data={
            [
              {
                image: travel,
                value: '拼团旅行'
              },
              {
                image: waimai,
                value: '拼团外卖'
              },
              {
                image: shop,
                value: '拼团购物'
              },
              {
                image: huiyuan,
                value: '会员账号'
              },
              {
                image: qita,
                value: '其他'
              },
            ]
          }/>
            <View className='recommend_title'>推荐</View>
            {OrderList?.map((obj,index) => (
            obj.picture?
              <View style={{borderTop:'1px solid black'}}>
              <SmallTab orderList={obj} />
              </View>
              :
              <View style={{borderTop:'1px solid black'}}>
              <NopicTab orderList={obj} />
              </View>
          ))}
        <AtDivider content='没有更多了' fontColor='#ed3f14' lineColor='#ed3f14' />
      </View>
    )
  }
}
