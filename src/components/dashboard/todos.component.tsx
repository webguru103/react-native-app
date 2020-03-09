import React from 'react';
import {
    View,
    ViewProps,
    TouchableOpacity
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    FooterShopTabIcon
} from '../../assets/icons/footer';
import { hp, wp } from '../../utils/utility';
import { Text, Spinner, Icon, Button } from 'react-native-ui-kitten/ui';

interface ComponentProps {
    todosList: Array<object>,
    title: string,
    titleStyle: any,
    button: boolean,
}

export type TodosProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    todos: Array<Object> | undefined;
    isLoading: Boolean | undefined;    
    button: Boolean | undefined;
}

class TodosComponent extends React.Component<TodosProps, State> {
    public state: State = {
        todos: [],
        isLoading: true, 
        button: this.props.button == undefined ? true : this.props.button == false ? false : true,
    };

    componentDidMount() {
        //simulate request
        var that = this;
        let data = this.props.todosList ?
            this.props.todosList :
            [
                { id: 1, date: 'JAN-1', title: 'Replace HVAC Filters', action: () => { console.log('navigate to somewhere') }, icon: <FooterShopTabIcon /> },
                { id: 2, date: 'JAN-10', title: 'Replace Water Filter', action: () => { console.log('navigate to somewhere') }, icon: <FooterShopTabIcon /> },
                { id: 3, date: 'JAN-15', title: 'Request termite fumigation', action: () => { console.log('navigate to somewhere') }, icon: <FooterShopTabIcon /> },
            ];
       
        setTimeout(function () {
            that.setState({ todos: data, isLoading: false })
        }, 2000)

    }

    private _renderTodo = (todo) => {
        const { style, themedStyle } = this.props;
        let splitDate = todo.date.split('-');
        return (
            <View key={todo.id} style={[themedStyle.todoStyle]}>
                <View style={themedStyle.dateContainer}>
                    <Text style={[themedStyle.dateText]}>{splitDate[0]}</Text>
                    <Text style={[themedStyle.dateText, themedStyle.dateTextDay]}>{splitDate[1]}</Text>
                </View>

                <TouchableOpacity style={themedStyle.todoContainer} onPress={todo.action} >
                    <Text numberOfLines={1} style={themedStyle.todoTitle}>{todo.title}</Text>
                    <FooterShopTabIcon />
                    <Icon name='chevron-right-outline' style={{ flex: 1 }} width={32} height={32} fill='#3366FF' />
                </TouchableOpacity>
            </View>
        );
    }

    public render(): React.ReactNode {
        const { style, themedStyle, ...restProps } = this.props;

        return (
            <View
                style={[themedStyle.container, style]}
                {...restProps}>
                <Text
                    style={[themedStyle.inputLabel, this.props.titleStyle]}
                    category='label'
                >
                    {this.props.title ? this.props.title : "TO-DO'S"}
                </Text>
                <View style={themedStyle.todosContainer}>
                    {this.state.isLoading ?
                        <Spinner />
                        : this.state.todos.length == 0 ?
                            <Button status='warning' appearance='outline' style={themedStyle.allButton}>No To-Do's for the moment</Button>
                            :
                            this.state.todos.map(todo => this._renderTodo(todo))
                    }
                </View>
                {this.state.todos.length  > 0 && this.state.button?
                    <Button status='info' appearance='outline' style={themedStyle.allButton}>View All</Button>
                    : null}
            </View>
        );
    }
}

export const Todos = withStyles(TodosComponent, (theme: ThemeType) => ({
    container: {
        //padding: 20
    },
    todosContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputLabel: {
        color: 'gray',
        fontSize: hp(2),
        lineHeight: 16,
        //marginBottom: 6,
        paddingLeft: 20
    },

    cardTitle: {
        color: '#696969',
        fontSize: hp(2),
        fontWeight: 'bold'
    },
    todoStyle: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        
    },
    dateContainer: {
        //width: wp(10),
        flex: 1,
        backgroundColor: '#40b9ff',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: hp(6)
    },
    todoContainer: {
        //width: wp(100),
        flexDirection: 'row',
        flex: 7,
        backgroundColor: '#bde7ff',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        borderRadius: 5,
       
    },
    todoTitle: {
        color: '#4F4F4F',
        fontWeight: 'bold',
        flex: 3,
        fontSize: hp(1.7)
    },
    dateText: {
        color: 'white',
        fontSize: hp(1.5)
    },
    dateTextDay: {
        fontSize: hp(2),
        fontWeight: 'bold'
    },
    allButton: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white'
    }
}));
