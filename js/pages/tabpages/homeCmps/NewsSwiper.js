import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default class NewsSwiper extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '最新资讯',
            data:[]
        }
    }

    componentDidMount() {
        fetch('https://satarmen.com/api/Article/article_list?ac_id=1&page=0')
        .then(response => response.json())
        .then((responseJson) => {
            let data = responseJson.result.article_list
            this.setState({data})
        })
        .catch(error => console.log(error))
    }

    render() {
        let data = this.state.data
        // console.log(data)
        return (
            <View style={styles.news_swiper}>
                <Text style={styles.title}>{this.state.title}</Text>
                <Swiper style={styles.wrapper}
                    horizontal={false}
                    autoplay={true}
                    autoplayTimeout={4}
                    paginationStyle={styles.paginationStyle}
                    showsPagination={false}
                >
                    {
                        data.map((item, index) => {
                            return <Text key={index} style={styles.newsText} >{item.article_title}</Text>
                        })
                    }
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    news_swiper: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 8,
        marginRight: 10,
        paddingTop: 10,
        paddingLeft: 5,
        borderRadius: 5
    },
    title: {
        color: 'red',
        fontWeight:'bold',
        marginRight: 15,
        fontSize:16
    },
    newsText:{
        height:40,
        lineHeight:20,
        color:'#333'
    }
});