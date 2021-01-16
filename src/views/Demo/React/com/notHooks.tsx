import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{/*<Typography>{children}</Typography>*/}
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>react Hooks不足</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>尽管我们通过上面的例子看到React Hooks的强大之处，似乎类组件完全都可以使用React Hooks来重写。但是当下16.8版本中，还无法实现getSnapshotBeforeUpdate和componentDidCatch这两个类组件中的生命周期函数。官方也计划在不久的将来在ReactHooks中实现</p>
						<p></p>
						<p></p>
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="类组件" {...a11yProps(0)} />
					<Tab label="hooks" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<CApp/>
			</TabPanel>
		</div>
	);
}


interface cAppState {
	count: any,
}
class CApp extends React.Component <any, cAppState> {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
		};
	}
	render() {
		const { count } = this.state;
		return (
			<div>
				Count: {count}
				<button onClick={() => this.setState({ count: count + 1 })}>+</button>
				<button onClick={() => this.setState({ count: count - 1 })}>-</button>
			</div>
		);
	}
}

// 父组件
function Parent() {
	const dataObj = {
		pData: 1,
		pData2: 2
	}
	const [data, setData] = useState({})
	const childRef = React.useRef<any>()
	function parentHandler() {
		console.log('parentHandler','子组件调用的父组件方法')
	}
	function parentDivClick() {
		console.log('父组件调用子组件方法')
		childRef.current._childFn()
	}
	return (<div>
		<Child ref={childRef} params1={dataObj.pData} params2={dataObj.pData2} handlerClick={parentHandler}></Child>
		<div onClick={parentDivClick}>父调子</div>
	</div>)
}

// 子组件
function ChildRef(props, ref) {
	// 接受父组件传值
	const {params1, params2, handlerClick} = props
	const childRef = React.useRef()
	// 暴露的子组件方法， 给父组件调用
	React.useImperativeHandle(
		ref,
		() => ({
			_childFn() { console.log('something') },
		})
	)
	// handlerClick子组件调用父组件方法
	return (
		<div ref={childRef} onClick={handlerClick}>
		</div>
	);
}

const Child = React.forwardRef(ChildRef)
