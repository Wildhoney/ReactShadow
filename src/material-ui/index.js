import React from 'react';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import { createProxy } from '../';

export default createProxy({}, 'material-ui', ({ children }) => {
    class ReactShadow extends React.Component {
        state = { node: null };

        constructor() {
            super();
            this.handleRef = (node) => this.setState({ node });
        }

        render() {
            const jss = create({
                ...jssPreset(),
                insertionPoint: this.state.node,
            });

            return (
                <StylesProvider jss={jss}>
                    <div ref={this.handleRef} />
                    {this.state.node && <>{children}</>}
                </StylesProvider>
            );
        }
    }

    return <ReactShadow />;
});
