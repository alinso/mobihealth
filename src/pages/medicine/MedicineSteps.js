import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import styles from "../../Styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import {withNavigation} from 'react-navigation';
import LocalTitles from "../LocalTitles";
import MedicineInfo from "./content/MedicineInfo";
import getLocalTitles from "../../getLocalTitles";
import getLocalContent from "../../getLocalContent";
import Images from "../../Images";
import FundaMentals1 from "./content/FundaMentals1";
import Fundamentals2 from "./content/Fundamentals2";
import Sources from "./content/Sources";
import Taxonomy from "./content/Taxonomy";
import HtmlView from "react-native-htmlview";
import Naming from "./content/Naming";
import Shapes1 from "./content/Shapes1";
import Shapes2 from "./content/Shapes2";
import Taking1 from "./content/Taking1";
import Taking2 from "./content/Taking2";
import Farmo from "./content/Farmo";
import Interactions from "./content/Interactions";
import Prescrption from "./content/Prescrption";
import Application from "./content/Application";
import Antibiotics from "./content/Antibiotics";
import SmartUse from "./content/SmartUse";
import MedicineTerms from "./content/MedicineTerms";
import Progress from "../../Progress";

let progress =new Progress();

class Welcome extends React.Component {
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
        progress.proceed("@medicine",progress.medicineCurent,this.titleIndex,this.state.currentStep+1);
    }

    onSwipeRight() {
        if (this.state.currentStep == 0) {
            this.props.navigation.navigate('MedicineMenu');
            return;
        }
        let newCurrentStep = this.state.currentStep - 1;
        this.setState({currentStep: newCurrentStep});
    }

    setContent(link) {
        let stepsTitle;
        if (link === "MedicineInfo") {
            getLocalContent(MedicineInfo, this);
            this.image = Images.module.medicine.infoPic;
            stepsTitle = this.state.titles.info;
            this.titleIndex=0;
        } else if (link === "Fundamentals1") {
            getLocalContent(FundaMentals1, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.fundamentals1
            this.titleIndex=1;

        } else if (link === "Fundamentals2") {
            getLocalContent(Fundamentals2, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.fundamentals2
            this.titleIndex=2;

        } else if (link === "Sources") {
            getLocalContent(Sources, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.sources
            this.titleIndex=3;

        } else if (link === "Taxonomy") {
            getLocalContent(Taxonomy, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.taxonomy
            this.titleIndex=4;

        } else if (link === "Naming") {
            getLocalContent(Naming, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.naming
            this.titleIndex=5;

        } else if (link === "Shapes1") {
            getLocalContent(Shapes1, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.shapes1
            this.titleIndex=6;


        } else if (link === "Shapes2") {
            getLocalContent(Shapes2, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.shapes2
            this.titleIndex=7;


        } else if (link === "Taking1") {
            getLocalContent(Taking1, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.taking1
            this.titleIndex=8;


        } else if (link === "Taking2") {
            getLocalContent(Taking2, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.taking2
            this.titleIndex=9;


        }else if (link === "Farmo") {
            getLocalContent(Farmo, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.farmo
            this.titleIndex=10;


        }else if (link === "Interactions") {
            getLocalContent(Interactions, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.interaction
            this.titleIndex=11;


        }else if (link === "Prescription") {
            getLocalContent(Prescrption, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.prescription
            this.titleIndex=12;

        }else if (link === "Application") {
            getLocalContent(Application, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.application
            this.titleIndex=13;

        }else if (link === "Antibiotics") {
            getLocalContent(Antibiotics, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.antibiotics
            this.titleIndex=14;

        }else if (link === "SmartUse") {
            getLocalContent(SmartUse, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.smartuse
            this.titleIndex=15;


        }else if (link === "MedicineTerms") {
            getLocalContent(MedicineTerms, this);
            this.image = Images.module.medicine.infoPic
            stepsTitle = this.state.titles.medicineTerms
            this.titleIndex=16;

        }

        progress.proceed("@medicine",progress.medicineCurent,this.titleIndex,this.state.currentStep+1);
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

export default withNavigation(Welcome);
