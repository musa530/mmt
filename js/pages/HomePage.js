import React, {Component} from 'react';
import {Text, View, Button, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import DynamicTabNavigator from '../AppNavigator/DynamicTabNavigator';
import NavigationUtil from '../AppNavigator/NavigationUtil';

const {width, height} = Dimensions.get('window')

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
        }
    }

    componentDidMount(){
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return(
            <DynamicTabNavigator/>
            // <View style={{flex: 1}}>
            //     <Button title="Show modal" onPress={this.toggleModal} />
            //     <Modal
            //         animationIn='slideInUp'
            //         animationOut='slideOutDown'
            //         backdropOpacity={0.5}
            //         backdropColor='#333'
            //         onSwipeComplete={this.toggleModal}
            //         swipeDirection='down'
            //         isVisible={this.state.isModalVisible}
            //         onBackdropPress={this.toggleModal}
            //         backdropTransitionOutTiming={0}
            //         onBackButtonPress={this.toggleModal}
            //         style={{margin:0,}}
            //     >
            //     <View style={{flex:1,justifyContent:'flex-end'}}>
            //         <View style={{padding: 5,backgroundColor:'#fff'}}>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Text>Hello!</Text>
            //             <Button title="Hide modal" onPress={this.toggleModal} />
            //         </View>
                    
                    
            //     </View>
            //     </Modal>
            // </View>
        );
    }
}