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
					<Typography className={classes.heading}>useContext减少组件层级</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<p>1、上面介绍了useState、useEffect这两个最基本的API，接下来介绍的useContext是React帮你封装好的，用来处理多层级传递数据的方式，在以前组件树中，跨层级祖先组件想给子孙组件传递数据的时候，除了一层层props往下透传之外，我们还可以使用React Context API 来帮我们做这件事， 举个简单例子</p>
						<p><pre><code>
							{`
								const { Provider, Consumer } = React.createContext(null)
								function Bar(){
									return <Consumer>{color => <div>{color}</div>}</Consumer>
								}
								function Foo(){
									return <Bar/>
								}
								function App(){
									return (<Provider value={'grey'}><Foo/></Provider>)
								}
							`}
						</code>
						</pre></p>
						<p>2、通过React createContext的语法，在App组件中可以跨过Foo组件给Bar传递数据，而在React Hooks中，我们可以使用useContext进行改造</p>
						<p><pre><code>
							{`
								const colorContext = React.createContext("gray");
								function Bar2() {
									const color = React.useContext(colorContext);
									return <div>{color}</div>;
								}
								function Foo2() {
									return <Bar2 />;
								}
								function App2() {
									return (
										<colorContext.Provider value={"red"}>
											<Foo2 />
										</colorContext.Provider>
									);
								}
							`}
						</code>
						</pre></p>
						<p>传递给useContext的是<strong>context</strong>而不是<strong>consumer</strong>，返回值即是想要透传的数据了。用法很简单。使用useContext可以解决Consumer多状态嵌套的问题</p>
						<p><pre>
							{`
								function HeaderBar() {
									return (<CurrentUser.Consumer>
										{user => <Notifications.Consumer>
											{notifications => <header>
												Welcome back, {user.name}！
												you have {notifications.length} notifications.
											</header>}	
										</Notifications.Consumer>}
									</CurrentUser.Consumer>)
								}
							`}
						</pre></p>
						<p>而使用useContext则变得十分简洁，可读性更强且不会增加组件树深度</p>
						<p><pre>
							{`
								function HeaderBar() {
									const user = useContext(CurrentUser)
									const notifications = useContext(Notifications)
									return (<header>
										Welcome back, {user.name}！
										you have {notifications.length} notifications.
									</header>)
								}
							`}
						</pre></p>
					</div>
				</AccordionDetails>
			</Accordion>

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="第一种方式" {...a11yProps(0)} />
					<Tab label="第二种方式" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<CApp/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<App2/>
			</TabPanel>

		</div>
	);
}


const { Provider, Consumer } = React.createContext(null);
function Bar() {
	return <Consumer>{color => <div>{color}</div>}</Consumer>;
}
function Foo() {
	return <Bar />;
}

function CApp () {
	return (
		<Provider value={"grey"}>
			<Foo />
		</Provider>
	);
}

const colorContext = React.createContext("gray");
function Bar2() {
	const color = React.useContext(colorContext);
	return <div>{color}</div>;
}
function Foo2() {
	return <Bar2 />;
}
function App2() {
	return (
		<colorContext.Provider value={"red"}>
			<Foo2 />
		</colorContext.Provider>
	);
}
