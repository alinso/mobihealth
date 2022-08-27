import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import styles from "../../Styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import {withNavigation} from 'react-navigation';
import LocalTitles from "../LocalTitles";
import getLocalTitles from "../../getLocalTitles";
import getLocalContent from "../../getLocalContent";
import Images from "../../Images";
import Progress from "../../Progress";
import FirstaidInfo from "./content/FirstaidInfo";
import HtmlView from "react-native-htmlview";
import Fundamentals from "./content/Fundamentals";
import BasicApplications from "./content/BasicApplications";
import BasicIndikators from "./content/BasicIndicators";
import LifeKiss from "./content/LifeKiss";
import BasicLifeSupport from "./content/BasicLifeSupport";
import Bleed from "./content/Bleed";
import Amputation from "./content/Amputation";
import ForeignBodySting from "./content/ForeignBodySting";
let progress =new Progress();

class FirstaidSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: null,
            localContents: null,
            title: null,
            content: [],
            currentStep: 0,
        }

        this.titleIndex=0;
        this.image = null;
        let self = this;
        this.setContent = this.setContent.bind(this);
        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);


        getLocalTitles(LocalTitles, this).then(function () {
            setTimeout(function () {
                self.setContent(self.props.navigation.state.params.item);
            }, 500)
        });
    }

    onSwipeLeft() {
        if (this.state.currentStep == (this.state.content.length - 1)) {
            return;
        }
        let newCurrentStep = this.state.currentStep + 1;
        this.setState({currentStep: newCurrentStep});
        progress.proceed("@firstaid",this.titleIndex,newCurrentStep+1);
    }

    onSwipeRight() {
        if (this.state.currentStep == 0) {
            this.props.navigation.push('Firstaid');
            return;
        }
        let newCurrentStep = this.state.currentStep - 1;
        this.setState({currentStep: newCurrentStep});
    }

    setContent(link) {
        let stepsTitle;
        if (link === "FirstaidInfo") {
            getLocalContent(FirstaidInfo, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.info;
            this.titleIndex=0;
        }else if (link === "Fundamentals") {
            getLocalContent(Fundamentals, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.fundamentals;
            this.titleIndex=1;
        }else if (link === "BasicApplications") {
            getLocalContent(BasicApplications, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.basicApplications;
            this.titleIndex=2;
        }else if (link === "BasicIndicators") {
            getLocalContent(BasicIndikators, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.basicIndicators;
            this.titleIndex=3;
        }else if (link === "BasicLifeSupport") {
            getLocalContent(BasicLifeSupport, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.basicLifeSupport;
            this.titleIndex=4;
        }else if (link === "LifeKiss") {
            getLocalContent(LifeKiss, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.lifeKiss;
            this.titleIndex=5;
        }else if (link === "Bleed") {
            getLocalContent(Bleed, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.bleed;
            this.titleIndex=6;
        }else if (link === "Amputation") {
            getLocalContent(Amputation, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.amputation;
            this.titleIndex=7;
        }else if (link === "ForeignBodySting") {
            getLocalContent(ForeignBodySting, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.foreignBodySting;
            this.titleIndex=8;
        }

        console.log(this.state.currentStep+1);
        progress.proceed("@firstaid",this.titleIndex,this.state.currentStep+1);
        this.setState({title: stepsTitle})
    }


    render() {
        if (this.state.titles == null || this.state.title==null)
            return null;
        if (this.state.content == null)
            return null;

        let pagerWidth = 0;

        if (this.state.content.length > 1)
            pagerWidth = 90 * ((this.state.currentStep + 1) / this.state.content.length);

        return (
            <ScrollView>
                <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                    style={styles.appContainer}
                >
                    <View style={styles.flexContainer}>
                        <View style={{flex: 6}}>
                            <Text style={styles.stepTitle}>{this.state.title}</Text>
                            <Image style={styles.stepPic} source={this.image}/>
                            <View style={{
                                width: pagerWidth + "%",
                                height: "1%",
                                backgroundColor: "orange",
                                alignSelf: "flex-start",
                                marginLeft: "5%",
                                marginBottom:"5%"
                            }}></View>
                            <HtmlView style={styles.stepText}
                                      value={this.state.content[this.state.currentStep]}></HtmlView>
                        </View>
                    </View>

                </GestureRecognizer>
                <Image source={require("../../../assets/icon.png")} style={styles.footer}/>
            </ScrollView>
        );
    }
}

export default withNavigation(FirstaidSteps);
