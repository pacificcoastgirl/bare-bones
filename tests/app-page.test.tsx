import { render, screen } from '@testing-library/react';
import DashboardHome from '@/app/page';

describe('DashboardHome', () => {
  it('renders the hub title and dashboard sections', () => {
    render(<DashboardHome />);

    expect(screen.getByRole('heading', { name: /headquarters of the house of bootleg/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /taxes and things/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /erm ackshually/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /fun stuff that doesn't \(totally\) suck/i })).toBeInTheDocument();
  });

  it('renders the expected app cards and destination links', () => {
    render(<DashboardHome />);

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(5);
    expect(screen.getByRole('link', { name: /shopping list/i })).toHaveAttribute('href', '/shopping-list');
    expect(screen.getByRole('link', { name: /chore matrix/i })).toHaveAttribute('href', '/app-viewer/chore-tracker');
    expect(screen.getByRole('link', { name: /math blaster/i })).toHaveAttribute('href', '/app-viewer/math-blaster');
    expect(screen.getByRole('link', { name: /capsule/i })).toHaveAttribute('href', '/app-viewer/capsule');
    expect(screen.getByRole('link', { name: /space shooter/i })).toHaveAttribute('href', '/app-viewer/space-shooter');
  });

  it('shows all declared category tags in the rendered cards', () => {
    render(<DashboardHome />);

    expect(screen.getAllByText(/Utility/i)).toHaveLength(2);
    expect(screen.getAllByText(/Education/i)).toHaveLength(2);
    expect(screen.getAllByText(/Game/i)).toHaveLength(3);
  });
});
