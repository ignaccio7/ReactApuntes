function _extends(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};return _extends.apply(this,arguments)}function _object_without_properties_loose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key]}return target}import{jsx as _jsx}from"react/jsx-runtime";import{BUTTONS,EVENTS}from"./consts";export function navigate(href){window.history.pushState({},"",href);var navigationEvent=new Event(EVENTS.PUSHSTATE);window.dispatchEvent(navigationEvent)}export function Link(_param){var target=_param.target,to=_param.to,props=_object_without_properties_loose(_param,["target","to"]);var handleClick=function(event){var isMainEvent=event.button===BUTTONS.primary;var isModifiedevent=event.metaKey||event.altKey||event.ctrlKey||event.shiftKey;var isManageableEvent=target===undefined||target==="_self";if(isMainEvent&&isManageableEvent&&!isModifiedevent){event.preventDefault();navigate(to)}window.scrollTo(0,0)};return _jsx("a",_extends({onClick:handleClick,href:to,target:target},props))}