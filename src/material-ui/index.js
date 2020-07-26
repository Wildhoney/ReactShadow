import React from 'react';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import { createProxy } from '../';

export default createProxy({}, 'material-ui', ({ root, children }) => {
    class Main extends React.Component {
        constructor() {
            super();
            this.state = { node: null };
            this.handleRef = (node) => this.setState({ node });
        }

        render() {
            const jss = create({
                ...jssPreset(),
                insertionPoint: this.state.node,
            });

            return (
                <StylesProvider jss={jss}>
                    {this.state.node && <>{children}</>}
                    <div ref={this.handleRef} />
                </StylesProvider>
            );
        }
    }

    return <Main />;
});
