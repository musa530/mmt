import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';

var {height: h, width:w} = Dimensions.get('window');


export default class SwiperList extends Component{
    constructor(props){
        super(props);
        this.state = {
            banners:[],
            swipeId:0
        }
    }

    componentDidMount(){
        // console.log(this.props.banners.length)
        // this.startTimer()
    }

    shouldComponentUpdate() {
        // return true;
    }

    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer)
    }

    onAnimationEnd = e => {
        // console.log(e)
        var offsetX = e.nativeEvent.contentOffset.x

        var currentPage = Math.floor(offsetX/w) + 1
        // console.log(currentPage)
    }

    ScrollBeginDrag = () => {
        this.timer && clearInterval(this.timer);
    }

    startTimer = () => {
        var scrollView = this.refs.scrollView
        // console.log(scrollView)
        var imgCount = this.props.banners.length
        // console.log(imgCount)
        this.timer = setInterval(() => {
            var currentPage = 0;

            if((this.state.swipeId + 1) >= imgCount) {
                currentPage = 0;
            } else {
                currentPage = this.state.swipeId + 1
            }

            this.setState({
                swipeId: currentPage
            })

            var offsetX = currentPage * (w - 10);

            scrollView.scrollResponderScrollTo({x: offsetX, y: 0, animated: true})
            // console.log(this.state.swipeId)
        }, 3000);
    }

    renderPage = () => {
        
    }

    render() {
        // var swiperHeight = this.props.height;
        let banners = this.props.banners;
        let imgList = new Array();
        banners.map((item, index) => {
            imgList.push(item.adv_code)
        })

        return (
            <View style={{height: w/16 * 8}}>
               {/* <ScrollView
                    ref="scrollView"
                    style={{height: w/16 * 8}}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    onScrollBeginDrag={()=>this.ScrollBeginDrag()}
                    onScrollEndDrag={() => this.startTimer()}
                >
                    {imgList.map((item, index) => {
                        
                            return(
                                <Image
                                    key={index}
                                    source={{uri: item}}
                                    style={{height: w/16 * 8, width: w - 10,borderRadius:6}}
                                />
                            )
                        }
                        
                    )}
                </ScrollView> */}
                {/* 指示器 */}
                {/* <View style={styles.pageViewStyle}>
                    {this.renderPage()}
                </View> */}
                <Swiper
                    autoplay={true}
                    autoplayTimeout={3}
                    showsButtons={false}
                    style={{}}
                >
                    {imgList.map((item,index) => {
                        return <Image source={{uri: item}} key={index} style={{height: w/16 * 8, width: w - 10,borderRadius:6}}/>
                    })

                    }
                </Swiper>
            </View>
            

        );
    }
}

const styles = StyleSheet.create({
    pageViewStyle: {
        width:w - 10,
        height:25,
        backgroundColor:'rgba(0,0,0,0.2)',
        //定位
        position:'absolute',
        bottom:0,

        //主轴方向
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6
    }
})