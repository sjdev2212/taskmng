import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import MyCalendar from '../components/Calendar.js';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import Bills from '../components/Bills.js';
const mockedUsedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));
 

 describe('Bills', () => {
    test('renders Bills component', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
        const getBills = jest.fn();
        const totalPaid = 0;
        const totalUnPaid = 0;
        const loading = false;
        const setLoading = jest.fn();
        const bills = [];
        const setBills = jest.fn();
        render(<Bills userId={userId} 
            theme={theme}
            language={language}
            getBills={getBills}
            totalPaid={totalPaid}
            totalUnPaid={totalUnPaid}
            loading={loading}
            setLoading={setLoading}
            bills={bills}
            setBills={setBills}
        />);
        screen.debug();
    }
    );
test('has a btn to delete all', () => {
    const userId = 123
    const theme = "light"
    const language = "spanish"
    const getBills = jest.fn();
    const totalPaid = 0;
    const totalUnPaid = 0;
    const loading = false;
    const setLoading = jest.fn();
    const bills = [];
    const setBills = jest.fn();
    render(<Bills userId={userId} 
        theme={theme}
        language={language}
        getBills={getBills}
        totalPaid={totalPaid}
        totalUnPaid={totalUnPaid}
        loading={loading}
        setLoading={setLoading}
        bills={bills}
        setBills={setBills}
    />);
    const addBtn = screen.getByTestId('del-all');
    expect(addBtn).toBeInTheDocument();




    })




 });
