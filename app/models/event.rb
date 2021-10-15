class Event < ApplicationRecord

    default_scope { order(:date) }

end
