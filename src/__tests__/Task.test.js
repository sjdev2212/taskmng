import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {useNavigate} from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers.js';
import Task from '../components/Task.js';
import { set } from 'date-fns';
const mockedUsedNavigate = jest.fn();   


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 describe ('Task', () => {
        const language = "english";
        const theme = "light";
        const tasks = [];
         const setTasks = jest.fn();
        const setLoading = jest.fn();
        const loading   = false;
        const userId = 1;
        

        mockedUsedNavigate.mockImplementation(() => null);
        
        test('renders Task component', () => {
            render(<Task language={language}
                  theme={theme}
                    tasks={tasks}
                    setTasks={setTasks}
                    setLoading={setLoading}
                    loading={loading}
                    userId={userId}


                  />);
            
        });
        test('when there are no tasks it displays a message', () => {
            render(<Task language={language}
                theme={theme}
                  tasks={tasks}
                  setTasks={setTasks}
                  setLoading={setLoading}
                  loading={loading}
                  userId={userId}
/>
                );
                const elementsWithTestId = screen.getAllByTestId('testi');

if (tasks.length === 0) {
  elementsWithTestId.forEach(element => {
    expect(element).toBeInTheDocument();
  });
}

               

    });
    test('when there are tasks it displays them', () => {
        const tasks = [{id: 1, title: "test", description: "test", date: "2021-05-05", time: "12:00:00", userId: 1}];
        render(<Task language={language}
            theme={theme}
              tasks={tasks}
              setTasks={setTasks}
              setLoading={setLoading}
              loading={loading}
              userId={userId}
/>
            );
            const elementsWithTestId = screen.getAllByTestId('testo');

            if (tasks.length > 0) {
              elementsWithTestId.forEach(element => {
                expect(element).toBeInTheDocument();
              });
            }
        });

});