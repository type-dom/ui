// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import { Meta, StoryObj } from '@storybook/html';

import { TdButton as Button } from './td-button.class';

const meta: Meta<typeof Button> = {
  // component: new Button().dom,
};
export default meta;

// type Story = StoryObj<typeof Button>;

// export const Basic: Story = {};
//
// export const Primary: Story = {
//   args: {
//     // primary: true,
//     // type: 'primary',
//   },
// };
