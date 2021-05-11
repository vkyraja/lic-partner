import { bindActionCreators } from '@reduxjs/toolkit';

import { actions } from '../reducers';

export const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const Utils = {
    mapDispatchToProps
};

export default Utils;
