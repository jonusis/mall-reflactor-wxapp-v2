import { Component } from 'react'
import { View, Text,Input,Textarea,Button,Image,Picker } from '@tarojs/components'
import { AtInput, AtForm, AtIcon, AtCard } from 'taro-ui'
import { AtSteps } from 'taro-ui'
import './add.scss'
import './detail.scss'
import Taro from '@tarojs/taro';
import pho from '../../static/image/pho.png'
import card from '../../static/image/wodedingdan.png'
import { addOrderBuy } from '../../common/request/orderBuy'
import '../../static/image/placeicon.png';
import '../../static/image/timeicon.png'

interface AddProps{
}
interface AddState{
    current: number
    kind:number
    url:string
    heading:string
    content:string
    location:string
    numNeed:string
    timeBuy:string
    selector:Array<string>
    selectorChecked:string
    selectorPlace:Array<string>
    selectorCheckedPlace:string
    selectorNumber:Array<string>
    selectorCheckedNumber:string
    selectorCheckedTime:string
}
export default class Add extends Component<AddProps,AddState> {
  constructor(props:AddProps){
    super(props);
    this.state={
        current: 0,
        kind:0,
        url:'',
        heading:'',
        content:'',
        location:'',
        numNeed:'',
        timeBuy:'',
        selector: ['拼团旅行', '拼团外卖', '拼团购物','会员账号','其他'],
        selectorChecked : '拼团旅行',
        selectorPlace: ['图书馆', '北门','南门','七号楼','八号楼','九号楼','东区宿舍','西区宿舍','元宝山','国交','学子餐厅','桂香园食堂', '博雅园食堂','东一食堂', '南湖食堂','学子食堂','南湖宿舍2栋','南湖宿舍5栋','南湖宿舍13栋'],
        selectorCheckedPlace: '图书馆',
        selectorNumber: ['2', '3', '4', '5','6'],
        selectorCheckedNumber: '2',
        selectorCheckedTime:'2022-1-13'
    }
  }
  componentWillMount () {
    Taro.removeStorageSync('qq'),
    Taro.removeStorageSync('tel'),
    Taro.removeStorageSync('wechat')
    Taro.removeStorageSync('con')
    Taro.removeStorageSync('image')
    console.log(Taro.getStorageSync('userInfo'));
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

    onChange (current) {
        this.setState({
        current
        })
    }
    chooseImage(){
        const that = this;
        Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
        }).then((res)=>{ 
          const tempFilePaths = res.tempFilePaths;
          Taro.uploadFile({
            url:'http://localhost:8080/fileUpload/',
            name:'file',
            filePath:tempFilePaths[0],
            success:function(res){
              var ob=JSON.parse(res.data)
              Taro.setStorageSync('image',ob.data)
              that.setState({url:ob.data});
            }
          })
        })
      }
      changeheading(e) {
        this.setState({
          heading: e.target.value
        });
        return e.target.value;
      }
      onChangePlace(e) {
        const value = e.target.value;
        const {selectorPlace} = this.state;
        this.setState({selectorCheckedPlace:selectorPlace[value],location:value});
      }
      onChangeNumber(e) {
        const value = e.target.value;
        const {selectorNumber} = this.state;
        this.setState({selectorCheckedNumber:selectorNumber[value],numNeed:value});
      }
      onChangeTime(e) {
        const value = e.target.value;
        this.setState({selectorCheckedTime:value,timeBuy:value});
      }
      changecontent(e) {
        this.setState({
          content: e.target.value
        });
        return e.target.value;
      }
      classify(e){
        const value = e.target.value;
        const {selector} = this.state;
        this.setState({selectorChecked:selector[value],kind:value});
      }
      async toPostOrder(){
        const {heading,content} = this.state;
        if((heading!=='')&&(content!=='') ){
            const body = {
              postID:Taro.getStorageSync('userInfo').uid,
              kind:this.state.kind,
              heading:heading,
              content:content,
              time:this.state.selectorCheckedTime,
              location: this.state.selectorCheckedPlace,
              numNeed: this.state.selectorCheckedNumber,              
              picture:Taro.getStorageSync('image'),
              tel:Taro.getStorageSync('userInfo').tel,
              qq:Taro.getStorageSync('userInfo').qq,
              wechat:Taro.getStorageSync('userInfo').wechat,
            }
            const res = await addOrderBuy(body);
            if(res.code === 200){
                Taro.showToast({
                    title: "发布成功",
                    icon: "success",
                    duration: 1000
                  });
                  Taro.navigateBack();
            }else{
                Taro.showToast({
                    title: "请检查标题或联系方式哦",
                    icon: "none",
                    duration: 1300
                  })
            }
        }
    }
  render () {
      const {current,heading,content,selectorChecked,selector,selectorPlace,selectorCheckedPlace,selectorCheckedTime,selectorNumber,selectorCheckedNumber} = this.state;
      const {name,qq,wechat,tel,headPicture} = Taro.getStorageSync('userInfo');
    const items = [
        { 'title': '填写拼单需求', 'desc': '记得填写详细一点噢' },
        { 'title': '检查拼单信息', 'desc': '记得检查正确的信息噢' },
      ]
    return (
      <View className='index'>
        <AtSteps
            items={items}
            current={current}
            onChange={this.onChange.bind(this)}
        />
        {current === 0 ?
        <>
        <View className='titlebox'>
        <Text className='s'>标 题:</Text>
        <Input
          className='input' 
          type='text' 
          maxlength={10}
          placeholder='写清商品名称有助于找到更多拼友'
          value={heading}
          onInput={this.changeheading.bind(this)}
        ></Input>
        </View>
        <View className='describe'>
        <View className='textbox'>
        <Text className='s'>描述:</Text>
        <Textarea 
          className='textarea-one' 
          placeholder='拼单商品的详细信息和对拼友的要求'
          value={content}
          onInput={this.changecontent.bind(this)}
        ></Textarea>
        </View>
        <View className='addbox'>
        <Button className='addpho' onClick={this.chooseImage.bind(this)}>
        <Image src={pho} className='pho-one'></Image>
        <Text className='text-one'>添加照片</Text>
        </Button>
        <Image src={this.state.url} className='pho-two'></Image>
        </View>
      </View>
      <View className='choose-box'>
      <View className='page-section'>
        {/* <Image className='pho' src={category} /> */}
        <View>
            <Picker mode='selector' range={selector} onChange={this.classify.bind(this)} >
                <View className="pck">
                <View className='address'>分类</View>
                <View className='arry'>
                    <Text>{selectorChecked}</Text>
                    <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
                </View>
                </View>
            </Picker>
      </View>
    </View>
    <View className='page-section'>
        {/* <Image className='pho' src={place} /> */}
        <View>
            <Picker mode='selector' range={selectorPlace} onChange={this.onChangePlace.bind(this)}>
            <View className="pck">
                <Text className='address'>拼单地点</Text>
                <View className='arry'>
                    <Text>{selectorCheckedPlace}</Text>
                    <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
                </View>
            </View>
            </Picker>
        </View>
    </View>
    <View className='page-section'>
        {/* <Image className='pho' src={place} /> */}
        <View>
            <Picker mode='date' value={selectorCheckedTime} onChange={this.onChangeTime.bind(this)}>
            <View className="pck">
                <Text className='address'>拼单时间</Text>
                <View className='arry'>
                    <Text>{selectorCheckedTime}</Text>
                    <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
                </View>
            </View>
            </Picker>
        </View>
    </View>
    <View className='page-section'>
        {/* <Image className='pho' src={place} /> */}
        <View>
            <Picker mode='selector' range={selectorNumber} onChange={this.onChangeNumber.bind(this)}>
            <View className="pck">
                <Text className='address'>拼单人数</Text>
                <View className='arry'>
                    <Text>{selectorCheckedNumber}</Text>
                    <AtIcon className='icon-chevron' value='chevron-right' size='20' color='grew'></AtIcon>
                </View>
            </View>
            </Picker>
        </View>
    </View>
        {/* 
        <Time onTime={this.time.bind(this)} />
        <People onPeople={this.numpeople.bind(this)} />
        <Text className='connect'>{this.state.con}
        </Text>
        <Connection /> */}
      </View>
      <Button className={'next'} onClick={() => {this.setState({current:1})}} >下一步</Button>
        </>
         :<>
         <View className="contentMessage">
         <AtCard
            title={'拼单信息'}
            thumb={card}
        >
      <View className='content'>
      <View className='usrmasg'>
        <Image className='headsculpture' src={headPicture}> </Image>
        <View className='nickname'>{name}</View>
        </View>
        <View className='header'>{heading}</View>
        <View className='cnt'>{content}</View>
        <View className='places1'>
          <View className='placetxt'>联系方式：</View>
          {qq && <View className='placetxt'>qq：{qq}</View>}
          {tel && <View className='placetxt'>电话：{tel}</View>}
          {wechat && <View className='placetxt'>微信：{wechat}</View>}
        </View>
        <View className='time'>
          <View className='timetxt'>拼单类型：{selectorChecked}</View>
        </View>
        <View className='place'>
          <View className='placetxt'>拼单所需人数：{selectorCheckedNumber}</View>
        </View>
        <View className='time'>
          <Image className='timeimg' src='../../static/image/timeicon.png' ></Image>
          <View className='timetxt'>下单时间：{selectorCheckedTime}</View>
        </View>
        <View className='place'>
          <Image className='placeimg' src='../../static/image/placeicon.png'></Image>
          <View className='placetxt'>拼单地点：{selectorCheckedPlace}</View>
        </View>
        {Taro.getStorageSync('image')?
        <View className='img-box'>
        <Image className='content-imge' src={Taro.getStorageSync('image')} mode='aspectFit' ></Image>
        </View>
        :
        <View></View>
        }
        </View>
        </AtCard>
             </View>
         <Button className={'footer'} onClick={this.toPostOrder.bind(this)} >确认发布</Button>
         </>}
      </View>
    )
  }
}
