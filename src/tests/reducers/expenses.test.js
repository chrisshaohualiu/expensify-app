import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', ()=>{
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', ()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '2'
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expenses if id not found', ()=>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id:'-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add an expense', ()=>{
    const expense = {
        id: '4',
        description: 'Coffee',
        note: '',
        amount: 300,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
})

test('should edit an expense', ()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id:'1',
        updates: {description: 'Bubblegum'}
    };
    const state= expensesReducer(expenses,action);
    expect(state[0].description).toEqual('Bubblegum');
})

test('should not edit an expense if expense not found', ()=>{
    const action = {
        type: 'EDIT_EXPENSE',
        id:'-1',
        updates: {description: 'Bubblegum'}
    };
    const state= expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
})