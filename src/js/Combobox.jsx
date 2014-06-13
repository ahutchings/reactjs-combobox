/** @jsx React.DOM */
/* global React */

/**
 * @namespace My Namespace
 */
var NS = NS || {};

/**
 * @module Combobox
 */
NS.Combobox = (function (React) {

    var cx = React.addons.classSet;

    /**
     * Generate CSS class for Element
     * @param  {string} blockName
     * @param  {string} elemName  Element name
     * @return {string}           CSS class for Element
     */
    var clsElem = function (blockName, elemName) {
        var className = blockName + '__' + elemName;
        return className;
    };

    /**
     * Generate CSS class for Block or Element state (modificator)
     * @param  {string} blockName Block name or Element name generated by clsElem
     * @param  {string} stateName
     * @param  {string} [stateValue]
     * @return {string}             CSS class for Block or Element with state
     */
    var clsState = function (blockName, stateName, stateValue) {
        var className = blockName + '_' + stateName +
                        ((stateValue == null) ? '' : '-' +  stateValue);
        return className;
    };

    var BLOCK = 'Combobox';

    var ComboboxDivider = React.createClass({
        render: function() {
            return (
                <li className={clsElem(BLOCK, 'dropdownDivider')}/>
            );
        }
    });

    var ComboboxOption = React.createClass({
        propTypes: {
            selected: React.PropTypes.bool,
            children: React.PropTypes.string
        },
        render: function() {
            var cls = {};
            cls[clsElem(BLOCK, 'dropdownItem')] = true;
            cls[clsState(clsElem(BLOCK, 'dropdownItem'), 'selected')] = this.props.selected;

            return (
                <li className={cx(cls)}>{this.props.children}</li>
            );
        }
    });

    /**
     * Combo box UI component
     * @class
     */
    var Combobox = React.createClass({
        // Default component methods
        propTypes: {
            children: React.PropTypes.arrayOf(ComboboxOption, ComboboxDivider)
        },

        getInitialState: function() {
            return {
                data: [],
                isOpen: false
            };
        },

        render: function() {
            return (
                <div className={BLOCK + ' ' + ((this.state.isOpen) ? clsState(BLOCK, 'open') : '')}>
                    <input type="text" className={clsElem(BLOCK, 'input')} defaultValue="test"/>
                    <div className={clsElem(BLOCK, 'dropdown')}>
                        <div className={clsElem(BLOCK, 'dropdownWrapper')}>
                            <ul className={clsElem(BLOCK, 'dropdownList')}>
                                {this.props.children}
                            </ul>
                        </div>
                    </div>
                    <span className={clsElem(BLOCK, 'buttonWrapper')}>
                        <button type="button" onMouseDown={this.toggle} className={clsElem(BLOCK, 'button')}>▼</button>
                    </span>
                </div>
            );
        },

        // Custom component methods
        /**
         * Open Comobo box dropdown
         */
        open: function() {
            this.setState({isOpen: true});
        },

        /**
         * Close Comobo box dropdown
         */
        close: function() {
            this.setState({isOpen: false});
        },

        /**
         * Toggle (Open or Close) Comobo box dropdown
         */
        toggle: function () {
            this.setState({isOpen: !this.state.isOpen});
        },

    });


    var exp = {
        Combobox: Combobox,
        ComboboxOption: ComboboxOption,
        ComboboxDivider: ComboboxDivider
    };

return exp;
})(React);