import React from 'react';
import {Image, Text, TouchableOpacity} from "react-native";
import styles from "../Styles";
import {withNavigation} from 'react-navigation';
import Progress from "../Progress";


function ModuleSubtitle(props) {
    let {imgSource} = props;
    let progress = new Progress();


    return (
        <TouchableOpacity onPress={() => handlePress(props.moduleName, props.titleIndex)}
                          style={styles.moduleListItem}>
            <Image source={imgSource} style={styles.moduleStepImage}/>
            <Text style={styles.moduleSteptitle}>{props.title}</Text>
        </TouchableOpacity>
    );


    function handlePress(moduleName, titleIndex) {
        if (props.titleIndex == 0) {
            props.navigation.navigate(props.href, {item: props.navParam});
            return
        }

        progress.isAllowed(moduleName, titleIndex).then(function (res) {
            console.log("aa "+res);
            if (res) {
                props.navigation.navigate(props.href, {item: props.navParam});
            } else {
                alert(props.lockWarning);
            }
        });


    }


}

export default withNavigation(ModuleSubtitle);
