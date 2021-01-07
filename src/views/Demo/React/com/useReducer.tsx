import * as React from 'react'
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
	heading: {
		fontSize: '14px'
	}
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
					<Typography className={classes.heading}>useState 保存组件状态</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、useReducer这个Hooks在使用上几乎跟Redux/React-Redux一模一样，唯一缺少的就是无法使用redux提供的中间件。我们将上述的计数器组件改写为useReducer</p>
						<p>
							<pre>
								{`
									function init(initialCount) {
										return {count: initialCount}
									}
									function reducer(state, action) {
										switch (action.type) {
											case 'increment':
											return {count: state.count - 1}
											case 'decrement':
											return {count: state.count + 1}
											case 'reset':
											return init(action.payload)
											default:
											throw new Error()
										}
									}
									function FApp() {
										const [c, sC] = React.useState(5)
										return (
										<div className="App">
											<Counter initialCount={c}></Counter>
										</div>
										);
									}
									function Counter({initialCount}) {
										const [state, dispatch] = React.useReducer(reducer, initialCount, init)
										return (<>
											<span>{state.count}</span>
											<button onClick={()=>{dispatch({type: 'increment'})}}>-</button>
											<button onClick={()=>{dispatch({type: 'decrement'})}}>+</button>
											<button onClick={()=>{dispatch({type: 'reset',payload: initialCount})}}>reset</button>
										</>)
									}
								`}
							</pre>
						</p>
						<p>用法跟redux基本上一致的用法也很简单，算是提供一个mini的Redux版本。</p>
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="hooks" {...a11yProps(0)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<FApp/>
			</TabPanel>


		</div>
	);
}

function init(initialCount) {
	return {count: initialCount}
}

function reducer(state, action) {
	switch (action.type) {
		case 'increment':
			return {count: state.count - 1}
		case 'decrement':
			return {count: state.count + 1}
		case 'reset':
			return init(action.payload)
		default:
			throw new Error()
	}
}

function FApp() {
	const [c, sC] = React.useState(5)
	return (
		<div className="App">
			<Counter initialCount={c}></Counter>
		</div>
	);
}

function Counter({initialCount}) {
	const [state, dispatch] = React.useReducer(reducer, initialCount, init)
	return (<>
		<span>{state.count}</span>
		<button onClick={()=>{dispatch({type: 'increment'})}}>-</button>
		<button onClick={()=>{dispatch({type: 'decrement'})}}>+</button>
		<button onClick={()=>{dispatch({type: 'reset',payload: initialCount})}}>reset</button>
	</>)
}
