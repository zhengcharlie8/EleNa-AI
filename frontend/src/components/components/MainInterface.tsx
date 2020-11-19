import React, { ReactNode } from 'react';
import { GrayButton } from './GrayButton';
import { SelectList } from './SelectList';
import { TextBox } from './TextBox';

import styles from './MainInterface.module.css';

//test code for component usage, not actually code for project
interface MainState {
    elevationOption: number
    textBoxInfo: string
}

class MainInterface extends React.Component<{}, MainState>{

    constructor(props: {}) {
        super(props);
        this.state = {
            elevationOption: -1,
            textBoxInfo: ""
        }
    }

    handleOnclickEvent = () => {
        console.log(this.state.elevationOption);
        console.log(this.state.textBoxInfo);
    };

    handleChangeElevation = (event: any) => {
        this.setState({ elevationOption: event.target.value });
        // alert(event.target.value);
    };

    handleChangeText = (event: any) => {
        this.setState({ textBoxInfo: event.target.value });
        // alert(event.target.value);
    };


    public render(): ReactNode {
        return (
            <div className={styles.container}>

                <SelectList
                    title={"Elevation"}
                    firstText="minimize"
                    secondText="maximize"
                    action={this.handleChangeElevation}
                    currentOption={this.state.elevationOption}
                />

                <TextBox
                    value={this.state.textBoxInfo}
                    action={this.handleChangeText}
                    placeholder={"stuff"} />

                <GrayButton text={"Hello "} action={this.handleOnclickEvent} />
                <GrayButton text={"Hello World"} action={this.handleOnclickEvent} />
            </div>)
    }

}

export { MainInterface };
