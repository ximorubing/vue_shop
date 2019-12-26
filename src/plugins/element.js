import Vue from 'vue'
import { Button,Form,FormItem,Input,Message,Container,Header,
    Aside,Main,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,
    Card,Table,TableColumn,Pagination,Row,Col,Switch,Dialog,
    Alert,Select,Option,MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Alert)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$message = Message
Vue.prototype.$confirm=MessageBox.confirm
