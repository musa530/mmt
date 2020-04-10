import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions, StyleSheet,TouchableOpacity} from 'react-native';
import DaiFuDetail from './DaiFuDetail';
import DaiFaDetail from './DaiFaDetail';

const {width, height} = Dimensions.get('window');

export default class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            id: ''
        }
    }

    componentDidMount(){
        // this.renderDetail()
    }



    static navigationOptions=()=>({
        title: '订单详情'
    });

    renderDaiFuDetail(){
        return(
            <View>
                <DaiFuDetail/>
            </View>
        );
    }

    renderDaiFaDetail(){
        return(
            <View>
                <DaiFaDetail/>
            </View>
        );
    }

    renderDetail(){
        const {id} = this.props.navigation.state.params;
        if(id==1){
            return(
                <View>
                    {this.renderDaiFuDetail()}
                </View>
            );
        };

        if (id==2) {
            return(
                <View>
                    {this.renderDaiFaDetail()}
                </View>
            );
        }
        
    }

    render(){
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        
        
        return(
            <View>
                {this.renderDetail()}
            </View>
        );
    }
}