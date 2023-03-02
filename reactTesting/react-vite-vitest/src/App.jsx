import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Accordion from './Accordion';

describe("Accordion", () => {

    beforeEach(() => {
        render(<Accordion title='Testing'><h4>Content</h4></Accordion>);
    });

    test("should show title all the time", () => {
       
        expect(screen.getByText(/Testing/i)).toBeDefined()
    })

    test("should not show the content at the start", () => {

        expect(screen.getByText(/Content/i)).toBeUndefined()

    })
})