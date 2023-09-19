import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import EditBill from '../components/EditBill.js';
const mockedUsedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));
 
describe('EditBill', () => {
    test('renders EditBill component', () => {
        const userId = 123
        const theme = "light"
        const language = "spanish"
     
        render(<EditBill userId={userId} 
            theme={theme}
            language={language}
        
        />);
        screen.debug();
    }
    );
test('has a btn to edit', () => {
    const userId = 123
    const theme = "light"
    const language = "spanish"
    render(<EditBill userId={userId} 
        theme={theme}
        language={language}
    />);
    const editBtn = screen.getByTestId('Edit');
    expect(editBtn).toBeInTheDocument();
});
});