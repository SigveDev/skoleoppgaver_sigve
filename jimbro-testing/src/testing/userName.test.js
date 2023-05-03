
import { render, screen } from '@testing-library/react';
import UserName from '../components/userName';

test("render UserName component", () => {
    render(<UserName user={{displayName: "Test User"}} />);
    const userNameElement = screen.getByTestId("userName-1");
    expect(userNameElement).toBeInTheDocument();
    expect(userNameElement).toHaveTextContent("Hello, Test User");
})