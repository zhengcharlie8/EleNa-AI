import React, { ReactNode } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from "./theme";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from "./button.module.css";

interface MultipleButtonProps {
    title: string,
    firstText: string,
    secondText: string,
    action: any,
    currentOption: any
}

class SelectList extends React.Component<MultipleButtonProps>{

    public render(): ReactNode {
        return (
            <MuiThemeProvider theme={theme}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple" className={styles.selectListText}>{this.props.title}</InputLabel>
                    <Select className={styles.selectList}
                        color="primary"
                        native
                        value={this.props.currentOption}
                        onChange={this.props.action}
                    >
                        <option aria-label="None" value="" />
                        <option value={0} >{this.props.firstText}</option>
                        <option value={1} >{this.props.secondText}</option>
                    </Select>
                </FormControl>
            </MuiThemeProvider>
        )
    }

}

export { SelectList };
