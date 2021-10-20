class PlanningController < ApplicationController
  layout "planning"

  def index
    @planning_props = { current_date: Date.today }
  end
end
