import React, { Component } from 'react';

import FormCard from '../../components/FormCard';
import { FormData } from '../../utils/types';
import { FormState } from './types';
import FormCardList from '../../components/FormCardList';
import styles from './Form.module.scss';

export default class Form extends Component<Record<string, never>, FormState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.setFormState = this.setFormState.bind(this);
    this.state = {
      formStatesArr: [],
    };
  }

  setFormState(newState: FormData) {
    this.setState({ formStatesArr: [...this.state.formStatesArr, newState] });
  }

  componentDidUpdate() {
    console.log(this.state.formStatesArr);
  }

  render() {
    return (
      <div className="wrapper">
        <div className={styles.form} data-testid="form">
          <FormCard setFormState={this.setFormState} />
        </div>
        <FormCardList statesArr={this.state.formStatesArr} />
      </div>
    );
  }
}
